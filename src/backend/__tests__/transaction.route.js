const supertest = require('supertest');
const DATA = require('./transaction.json');
const USER = require('./user.json');
const WALLET = require('./wallet.json');
const app = require('../app');
const db = require('../db');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const Wallet = require('../models/wallet');


const ROUTE = '/transaction';

describe('transaction', () => {
  let server;
  let request;
  let transaction;
  let user;
  let wallet;

  beforeAll(async () => {
    await db.connect(process.env.TEST_DB_URI, { useMongoClient: true });
    await Transaction.remove({});
    await User.remove({});
    await Wallet.remove({});
    user = await User.create(USER);
    wallet = await Wallet.create({
      ...WALLET,
      user: user.id,
    });
    server = app.listen();
    request = supertest(server);
  });

  it('should create a transaction', async () => {
    const response = await request
      .post(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        ...DATA,
        user: user.id,
        wallet: wallet.id,
      })
      .expect(200);
    transaction = response.body;
    expect(transaction.id).toHaveLength(24);
  });

  it('should should error if wallet does not exist', async () => {
    await request
      .post(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send(DATA)
      .expect(500);
  });

  it('should update wallet balance on create', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance + transaction.amount);
  });

  it('should read transactions', async () => {
    await request
      .get(`${ROUTE}/in/${transaction.wallet}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect([transaction]);
  });

  it('should read transaction', async () => {
    await request
      .get(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(transaction);
  });

  it('should update transaction name', async () => {
    const updatedTransaction = {
      ...transaction,
      details: 'Renamed transaction',
    };
    await request
      .put(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send(updatedTransaction)
      .expect(200)
      .expect(updatedTransaction);
  });

  it('should update transaction amount', async () => {
    const updatedTransaction = {
      ...transaction,
      amount: transaction.amount * 2,
    };
    await request
      .put(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send(updatedTransaction)
      .expect(200)
      .expect(updatedTransaction);
    transaction = updatedTransaction;
  });

  it('should update wallet balance on update', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance + transaction.amount);
  });

  it('should delete transaction', async () => {
    await request
      .delete(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(transaction);
  });

  it('should update wallet balance on delete', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

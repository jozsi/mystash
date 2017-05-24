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
    await db.connect(process.env.DB_URI);
    await Transaction.remove({});
    await User.remove({});
    await Wallet.remove({});
    user = await User.create(USER);
    wallet = await Wallet.create(Object.assign({}, WALLET, { user: user.id }));
    server = app.listen();
    request = supertest(server);
  });

  it('should create a transaction', async () => {
    const response = await request
      .post(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send(Object.assign({}, DATA, { user: user.id, wallet: wallet.id }))
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

  it('should update wallet balance', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance + transaction.amount);
  });

  it('should read transactions', async () => {
    await request
      .get(`${ROUTE}/${transaction.wallet}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect([transaction]);
  });

  it('should read transaction', async () => {
    await request
      .get(`${ROUTE}/${transaction.wallet}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(transaction);
  });

  it('should update transaction', async () => {
    const updatedTransaction = Object.assign({}, transaction, { details: 'Renamed transaction' });
    await request
      .put(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send(updatedTransaction)
      .expect(200)
      .expect(updatedTransaction);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

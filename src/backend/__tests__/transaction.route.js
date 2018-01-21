const supertest = require('supertest');
const CATEGORY = require('./category');
const DATA = require('./transaction.json');
const USER = require('./user.json');
const WALLET = require('./wallet.json');
const app = require('../app');
const db = require('../db');
const Category = require('../models/category');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const Wallet = require('../models/wallet');


const ROUTE = '/transaction';

describe('transaction', () => {
  const transactions = [];
  const sumTransactions = () => transactions.reduce((a, b) => a.amount + b.amount, { amount: 0 });
  let server;
  let request;
  let user;
  let wallet;
  let category;

  function createTransaction(data) {
    return request
      .post(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        ...data,
        user: user.id,
        wallet: wallet.id,
      });
  }

  beforeAll(async () => {
    await db.connect(process.env.TEST_DB_URI);
    await Transaction.remove({});
    await User.remove({});
    await Wallet.remove({});
    user = await User.create(USER);
    wallet = await Wallet.create({
      ...WALLET,
      user: user.id,
    });
    category = await Category.create({
      ...CATEGORY,
      user: user.id,
    });
    server = app.listen();
    request = supertest(server);
  });

  it('should create a transaction', async () => {
    const response = await createTransaction(DATA)
      .expect(200);
    const transaction = response.body;
    expect(transaction.id).toHaveLength(24);
    transactions.push(transaction);
  });

  it('should should error if wallet does not exist', async () => {
    await request
      .post(ROUTE)
      .set('Authorization', `Bearer ${user.token}`)
      .send(DATA)
      .expect(500);
  });

  it('should not create a transaction if wallet does not exist', async () => {
    const transactionCount = await Transaction.count();
    expect(transactionCount).toBe(transactions.length);
  });

  it('should update wallet balance on create', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance + sumTransactions());
  });

  it('should read transaction', async () => {
    const transaction = transactions[0];
    await request
      .get(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(transaction);
  });

  it('should update transaction name', async () => {
    const transaction = transactions[0];
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
    transactions[0] = updatedTransaction;
  });

  it('should update transaction amount', async () => {
    const transaction = transactions[0];
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
    transactions[0] = updatedTransaction;
  });

  it('should update wallet balance on update', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance + sumTransactions());
  });

  it('should create a second transaction', async () => {
    const response = await createTransaction({
      ...DATA,
      amount: 5,
      details: 'Second transaction',
    }).expect(200);
    const transaction = response.body;
    expect(transaction.id).toHaveLength(24);
    transactions.push(transaction);
  });

  it('should read transactions by descending date', async () => {
    await request
      .get(`${ROUTE}/in/${wallet.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect([...transactions].reverse());
  });

  it('should delete second transaction', async () => {
    const transaction = transactions[1];
    await request
      .delete(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect(transaction);
    transactions.pop();
  });

  it('should update wallet balance on delete', async () => {
    const actualWallet = await Wallet.findById(wallet.id);
    expect(actualWallet.balance).toBe(wallet.balance + sumTransactions());
  });

  it('should create a transaction with a category', async () => {
    const response = await createTransaction({
      ...DATA,
      details: 'Categorized transaction',
      categories: [category._id],
    }).expect(200);
    const transaction = response.body;
    expect(transaction.id).toHaveLength(24);
    expect(transaction.categories).toEqual([category._id.toString()]);
    transactions.push(transaction);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

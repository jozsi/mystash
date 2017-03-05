const supertest = require('supertest');
const DATA = require('./transaction.json');
const app = require('../app');
const CONFIG = require('../config');
const db = require('../db');
const Transaction = require('../models/transaction');

const ROUTE = '/transaction';

describe('transaction', () => {
  let server;
  let request;
  let transaction;

  beforeAll(async () => {
    await db.connect(CONFIG.TEST_DB_URI);
    await Transaction.remove({});
    server = app.listen();
    request = supertest(server);
  });

  it('should create a transaction', async () => {
    const response = await request
      .post(ROUTE)
      .set('Authorization', `Bearer ${DATA.$token}`)
      .send(DATA)
      .expect(200);
    transaction = response.body;
    expect(transaction.id).toHaveLength(24);
  });

  it('should read transactions', async () => {
    await request
      .get(`${ROUTE}/${transaction.wallet}`)
      .set('Authorization', `Bearer ${DATA.$token}`)
      .expect(200)
      .expect([transaction]);
  });

  it('should update transaction', async () => {
    const updatedTransaction = Object.assign({}, transaction, { details: 'Renamed transaction' });
    await request
      .put(`${ROUTE}/${transaction.id}`)
      .set('Authorization', `Bearer ${DATA.$token}`)
      .send(updatedTransaction)
      .expect(200)
      .expect(updatedTransaction);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

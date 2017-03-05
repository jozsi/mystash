const supertest = require('supertest');
const DATA = require('./wallet.json');
const app = require('../app');
const CONFIG = require('../config');
const db = require('../db');
const Wallet = require('../models/wallet');

const ROUTE = '/wallet';

describe('wallet', () => {
  let server;
  let request;
  let wallet;

  beforeAll(async () => {
    await db.connect(CONFIG.TEST_DB_URI);
    await Wallet.remove({});
    server = app.listen();
    request = supertest(server);
  });

  it('should create a wallet', async () => {
    const response = await request
      .post(ROUTE)
      .set('Authorization', `Bearer ${DATA.$token}`)
      .send(DATA)
      .expect(200);
    wallet = response.body;
    expect(wallet.id).toHaveLength(24);
  });

  it('should read wallet', async () => {
    await request
      .get(`${ROUTE}/${wallet.id}`)
      .set('Authorization', `Bearer ${DATA.$token}`)
      .expect(200)
      .expect(wallet);
  });

  it('should update wallet', async () => {
    const updatedWallet = Object.assign({}, wallet, { name: 'Renamed wallet' });
    await request
      .put(`${ROUTE}/${wallet.id}`)
      .set('Authorization', `Bearer ${DATA.$token}`)
      .send(updatedWallet)
      .expect(200)
      .expect(updatedWallet);
  });

  afterAll(async () => {
    server.close();
    await db.disconnect();
  });
});

# myStash

[![Build Status](https://travis-ci.org/jozsi/mystash.svg)](https://travis-ci.org/jozsi/mystash)
[![Greenkeeper badge](https://badges.greenkeeper.io/jozsi/mystash.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/jozsi/mystash/graph/badge.svg)](https://codecov.io/gh/jozsi/mystash)

Personal finance app

### Requirements
- NodeJS v. 7.6.0 (or higher)
- MongoDB

### Installation Steps
- Make sure that NodeJS v.7.6.0 (or higher) is installed
- Clone (or download) the repository locally.
- Optionally, create a new file called `.env.local` filling in the necessary information for your local machine (e.g. the local connection to MongoDB), only for the fields you need to overwrite from the default `.env`
- Run `npm install` in the project's folder to install dependencies
- Run `npm start` to start the server
- Visit the project in your browser (usually the address will be http://localhost:3000 if you have configured NodeJS otherwise)

### Running tests
- To run all the tests, run `npm test`
- To run a specific test:
   - If `jest` is installed globally (with `(sudo) npm install jest -g`): `jest __tests__/myfile.js`
   - If `jest` is not installed globally: `./node_modules/.bin/jest __tests__/myfile.js`

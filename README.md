# myStash [![Build Status](https://travis-ci.org/jozsi/mystash.svg)](https://travis-ci.org/jozsi/mystash) [![Greenkeeper badge](https://badges.greenkeeper.io/jozsi/mystash.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/jozsi/mystash/graph/badge.svg)](https://codecov.io/gh/jozsi/mystash)

Personal finance app

## Getting started
### Requirements
- Node.js >= 8
- MongoDB

### Installation
1. Clone (or download) the repository locally
  ```
  git clone https://github.com/jozsi/mystash.git
  ```
2. Open your project folder
  ```
  cd mystash
  ```

3. Install dependencies
  ```
  npm install
  ```

### Configuration
1. Copy the example environment file
  ```
  cp .env.example .env
  ```

2. Edit `.env` and configure it for your needs
  ```
  nano .env
  ```

### Development
1. Run the development environment
  ```
  npm run dev
  ```

2. The app will be served at http://localhost:3001/
  ```
  open http://localhost:3001/
  ```

3. Any changes made to the code will be reflected

### Build
1. Build a production version of the frontend
  ```
  npm run build
  ```

2. Run the backend server
  ```
  npm start
  ```

3. Open the app at http://localhost:3000/
  ```
  open http://localhost:3000/
  ```

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store';

async function init() {
  const store = await configureStore;
  ReactDOM.render(
    React.createElement(App, { store }),
    document.getElementById('root')
  );
}

init();

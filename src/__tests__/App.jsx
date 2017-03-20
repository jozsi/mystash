import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import configureStore from '../store';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const store = await configureStore;

  ReactDOM.render(<App store={store} />, div);
});

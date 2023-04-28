import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import booksReducer from './store/reducers/books'

//combining reducers into one
const rootReducer = combineReducers({
  booksR: booksReducer
})

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>
);
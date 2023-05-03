import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login.jsx'
import Books from './components/Books.jsx'
import ProtectedRoute from './components/ProtectedRoute.js'
import booksReducer from './store/reducers/books'

// combining reducers into one
const rootReducer = combineReducers({
  booksR: booksReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const root = ReactDOM.createRoot(document.getElementById('root'));

const token = localStorage.getItem('jwtToken')
if(token) {
  // dispatch an action to update the isAuthenticated property in global state 
  store.dispatch({type: 'ON_LOGIN', payload: token})
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<ProtectedRoute><App /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
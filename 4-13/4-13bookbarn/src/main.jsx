import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import App from './App'
import AddBook from "./components/AddBook"
import Register from './components/Register'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import booksReducer from "../store/reducers/books"
import BookList from './components/BookList'

const rootReducer = combineReducers({
  booksR: booksReducer
})

const store = createStore(rootReducer)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <Provider store = {store}>
//     <Routes>
//    <Route path="/" element={<App />} />
//    <Route path = "/add-book" element = {<AddBook/>} />
//    <Route path = "/register" element = {<Register/>} />
//    </Routes>
//    </BrowserRouter>
//   </Provider>
//   </React.StrictMode>
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App/>
      <BookList />
    </Provider>
  </React.StrictMode>
);

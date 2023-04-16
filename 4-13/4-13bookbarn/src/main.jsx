import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import AddBook from "./components/AddBook"
import Register from './components/Register'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
   <Route path="/" element={<App />} />
   <Route path = "/add-book" element = {<AddBook/>} />
   <Route path = "/register" element = {<Register/>} />
   </Routes>
   </BrowserRouter>
  </React.StrictMode>,
)

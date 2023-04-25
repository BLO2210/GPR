import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import React from 'react'
// import './App.css'
import BookList from "./components/BookList"
// import AddBook from './components/AddBook'
import CartCount from './components/CartCount'

// import * as actionCreators from '../store/creators/actionCreators'


function App(props) {

  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
    // console.log(books)
  }, [])

  const fetchBooks = async() => {
    // console.log('fetchBooks')
    const response = await fetch ('http://localhost:8080/api/books')
    const result = await response.json()
    
    // console.log(result)
    setBooks(result)
  }
 
  return (
    <div>
      <h1>Home</h1>
      <CartCount/>
      <BookList books = {books}/>
      {/* {
        books && books ?
          <BookList books = {books}/> :
          <></>

      } */}
      {/* <AddBook/> */}
    </div>
  )
}


export default App

import { useState, useEffect } from 'react'
// import './App.css'
import BookList from "./BookList"


function App() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async() => {
    const response = await fetch ('http://localhost:8080/api/books')
    .then(res => res.json())

    setBooks(response)
  }

  return (
    <div>
      <BookList books = {books}/>
    </div>
  )
}


export default App

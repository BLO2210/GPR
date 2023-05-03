import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import Books from './Books'
import Cart from './Cart'
import Login from './Login'

import * as actionCreators from '../store/creators/actionCreators'

function App(props) {

  // const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:8080/api/books')
      const result = await response.json()
      const books = result
    // setBooks(response)
    props.onBooksLoad(books)
  }


  return (
    <>
      <p>TEST</p>
      <Cart/>
      <Books/>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBooksLoad: (allBooks) => dispatch(actionCreators.loadBooks(allBooks))
  }
}

export default connect(null, mapDispatchToProps)(App)

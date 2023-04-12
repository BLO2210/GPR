import { Component } from "react";
import Books from "./components/Books"
import AddBook from "./components/AddBook"
import "./Book.css";
//import other components here :)


class App extends Component {
  constructor() {
    super()

    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = async () => {
    const response = await fetch('http://localhost:8080/api/books')
    const books = await response.json()
    this.setState({
      books: books
    })
  }

  render() {
    return (
      <>
      <Books books = {this.state.books} />
      </>
    )
  }
}

export default App
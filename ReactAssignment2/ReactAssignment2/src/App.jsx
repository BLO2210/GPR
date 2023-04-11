import { Component } from "react"
import BookList from "./BookList"
import './App.css'

class App extends Component {

  constructor() {
    super(),
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
    .then(response => response.json())
    .then(result => {
      console.log(result)
      this.setState({
        books: result
      })
    })
  }

  render() {
    return (
      <div className = "***">
        {/* <Header /> */}
        <BookList books={this.state.books}/>
      </div>
    )
  }
}


export default App

import { Component } from "react";
import "./App.css"

class BookList extends Component {
    render() {

        const books = this.props.books
        const list = books.map((book) => {
            return (
                <div className="book">
                    <img className="book-image" src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`} />
                    <div className="book-title">{book.title}</div>
                    <p className="book-author">{book.author}</p>
                </div>
            )
        })
        return (
            <>
            <h1 className="book-heading">BOOKS</h1>
            <div className="book-list">{list}</div>
            </>
        )
    }
}

export default BookList

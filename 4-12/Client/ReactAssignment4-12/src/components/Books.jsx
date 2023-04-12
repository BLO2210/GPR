import { Component } from "react";
import "../Book.css";

class Books extends Component {
    render() {

        const books = this.props.books
        const bookItems = books.map(book => {
            return (
                <ul className="books-container">
                  {books.map(book => (
                    <li className="book-card" key={book._id}>
                      <img className="book-image" src={book.bookImageURL} alt={book.bookTitle} />
                      <div className="book-details">
                        <h2 className="book-title">{book.bookTitle}</h2>
                        <div className="book-author">{book.bookAuthor}</div>
                        <div className="book-publisher">{book.bookPublisher}</div>
                        <div className="book-year">{book.bookYear}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              );
              
        })

        return (
            <>
            <h1>Books</h1>
            {bookItems}
            </>
        )
    }
}

 export default Books;
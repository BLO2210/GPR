import { useState } from "react" 

function BookList(books) {

    const booksData = books.books
    const booksList = booksData.map((book) => {
        return (
            <ul className="books-container">
              <li className="book-card" key={book._id}>
                <img className="book-image" src={book.bookImageURL} alt={book.bookTitle} />
                <div className="book-details">
                  <h2 className="book-title">{book.bookTitle}</h2>
                  <div className="book-author">{book.bookGenre}</div>
                  <div className="book-publisher">{book.bookPublisher}</div>
                  <div className="book-year">{book.bookYear}</div>
                </div>
              </li>
          </ul>
        )
    })
    return(
        <section>{booksList}</section>
    )
}

export default BookList
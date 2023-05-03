import { connect } from "react-redux";
import React from "react";




function Books(props) {

    const handleAddToCart = (book) => {
        props.onAddBook(book)
    }

    const books = props.books   
    const bookItems = books.map(book => {
        return  <li className="book-card" key={book._id}>
                <img className="book-image" src={book.bookImageURL} alt={book.bookTitle} />
                <div className="book-details">
                  <h2 className="book-title">{book.bookTitle}</h2>
                  <div className="book-author">{book.bookGenre}</div>
                  <div className="book-publisher">{book.bookPublisher}</div>
                  <div className="book-year">{book.bookYear}</div>
                  <button onClick = {() => handleAddToCart(book)}>Add to Cart</button>
                </div>
              </li>
    })

    return (
        <section>{bookItems}</section>
    ) 
}

const mapStateToProps = (state) => {
    return {
        books: state.booksR.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBook: (book) => dispatch({type: 'ON_ADD_BOOK', payload: book})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Books)
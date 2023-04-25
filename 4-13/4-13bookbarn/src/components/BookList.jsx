// import { useState } from "react"
import { connect } from "react-redux"

function BookList(props) {
  // console.log(props)
  const handleAddToCart = (book) => {
    //inserting book into global state
    props.onBookAdd(book)
  }
  const books = props.books
  console.log(books)
  // //     const booksData = books.books
  // const booksList = books.map((book) => {
  //   return (
  //     <ul className="books-container" key={book._id}>
  //       <li className="book-card" key={book._id}>
  //         <img className="book-image" src={book.bookImageURL} alt={book.bookTitle} />
  //         <div className="book-details">
  //           <h2 className="book-title">{book.bookTitle}</h2>
  //           <div className="book-author">{book.bookGenre}</div>
  //           <div className="book-publisher">{book.bookPublisher}</div>
  //           <div className="book-year">{book.bookYear}</div>
  //           <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
  //         </div>
  //       </li>
  //     </ul>
  //   )
  // })
  // return (
  //   <section>{booksList}</section>
  // )
  // }
  

  return <div>
      {
        books && books.map((book) => {
          return <>
            <ul className="books-container" key={book._id}>
              <li className="book-card" key={book._id}>
                <img className="book-image" src={book.bookImageURL} alt={book.bookTitle} />
                <div className="book-details">
                  <h2 className="book-title">{book.bookTitle}</h2>
                  <div className="book-author">{book.bookGenre}</div>
                  <div className="book-publisher">{book.bookPublisher}</div>
                  <div className="book-year">{book.bookYear}</div>
                  <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
                </div>
              </li>
            </ul>
        </>
        })
      }
  </div>
  
}

const mapStateToProps = (state) => {
  return {
      books: state.booksR.books 
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onBookAdd: (book) => dispatch({type:'ON_BOOK_ADD', payload: book})
  }
}
// export default BookList
export default connect(mapStateToProps, mapDispatchToProps)(BookList)
//
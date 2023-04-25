import * as actionTypes from "../actions/actionTypes"

export const addBook = (book) => {
    return {
        type: actionTypes.ON_BOOK_ADD, payload: book
    }
}
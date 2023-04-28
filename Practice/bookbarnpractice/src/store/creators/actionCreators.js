import * as actionTypes from '../actions/actionTypes'


export const loadBooks = (books) => {
    return {
        type: 'BOOKS_LOAD',
        payload: books
    }
}
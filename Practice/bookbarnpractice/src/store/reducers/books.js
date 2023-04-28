import * as actionTypes from '../actions/actionTypes'

const inititalState = {
    books: [],
    cart: []
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.BOOKS_LOAD:
            return {
                ...state,
                books: action.payload
            }
        case 'ON_ADD_BOOK':
            return {
                ...state,
                cart: state.cart.concat(action.payload)
            }

            default:
                return state
    }
}

export default reducer
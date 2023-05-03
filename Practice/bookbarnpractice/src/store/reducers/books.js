import * as actionTypes from '../actions/actionTypes'

const inititalState = {
    books: [],
    cart: [],
    isAuthenticated: false
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
        case 'ON_LOGIN':
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated: action.payload != null
            }

        default:
            return state
    }
}

export default reducer
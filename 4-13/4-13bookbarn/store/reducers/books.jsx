import * as actionTypes from "../actions/actionTypes"
console.log(actionTypes)

const initialState = {
    books: [],
    cart: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.MOVIES_LOAD: 
        //     return {
        //         ...state, 
        //         movies: action.payload 
        //     }
        case actionTypes.ON_BOOK_ADD: 
            return {
                ...state, 
                cart: state.cart.concat(action.payload)
            }

        default:
            return state
    }
}


export default reducer
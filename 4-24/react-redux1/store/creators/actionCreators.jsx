import * as actionTypes from "../actions/actionTypes"

export const incrementCounter = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrementCounter = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const addTodo = (title) => {
    return {
        type: actionTypes.ON_TODO_ADD, payload:title
    }
}
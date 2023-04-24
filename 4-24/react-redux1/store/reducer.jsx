import * as actionTypes from "./actions/actionTypes"

const initialState = {
    counter:0,
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }

            case actionTypes.DECREMENT:
                return {
                    ...state,
                    counter: state.counter -1
                }

        case 'ON_TODO_ADD':
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            }
    }



     if (action.type == 'ADD') {
        return {
            ...state,
            counter: state.counter + parseInt(action.payload)
        }
    }

    else if (action.type == 'SUB') {
        return {
            ...state,
            counter: state.counter - parseInt(action.payload)
        }
    }
    return state
}

export default reducer
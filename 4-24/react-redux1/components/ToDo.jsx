import { connect } from "react-redux";
import { useState } from "react";
import * as actionTypes from "../store/actions/actionTypes"
import * as actionCreators from "../store/creators/actionCreators"

function ToDo(props) {

    const [todoTitle, setTodoTitle] = useState('')

    const handleTodoTitleChange = (e) => {
        setTodoTitle(e.target.value)
    }

    const handleAddToDo = () => {
        props.onTodoItemAdd(todoTitle)
    }
    return (
        <>
        <input type = "text" name = "listItem" onChange={handleTodoTitleChange}/>
        <button onClick = {handleAddToDo}>Submit</button>
        <h2>{props.newList}</h2>
        </>
    )
}

    const mapStateToProps = (state) => {
        
        return {
            newList: state.tasks
        }

    }

    const mapDispatchToProps = (dispatch) => {
        return {
            onTodoItemAdd: (title) => dispatch({type: 'ON_TODO_ADD', payload: title})
        }
    }


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
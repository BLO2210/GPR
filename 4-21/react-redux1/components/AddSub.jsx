import { connect } from "react-redux";
import { useState } from "react";

function AddSub(props) {

    const [value, setValue] = useState(0)

    const handleChange = (e) => {
        const value = parseInt(e.target.value)
        setValue(value)
    }

    const handleAdd = () => {
        props.onAdd(value)
    }

    const handleSub = () => {
        props.onSub(value)
    }
    
    
    return (
        <>
        <input type = "text" onChange = {handleChange} />
        <button onClick = {handleAdd}>Add</button>
        <button onClick = {handleSub}>Subtract</button>
        </>
    )

    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (value) => dispatch({type: 'ADD', payload:value}),
        onSub: (value) => dispatch({type: 'SUB', payload:value}),
        // onDecrement: () => dispatch({type:'DECREMENT'})
    }
}

export default connect(null, mapDispatchToProps)(AddSub)
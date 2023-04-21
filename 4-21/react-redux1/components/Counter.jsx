import { connect } from "react-redux";

function Counter(props) {

    const handleIncrement = () => {
        props.onIncrement()
    }

    const handleDecrement = () => {
        props.onDecrement()
    }
    return (
        <>
        <h1>{props.ctr}</h1>
        <button onClick = {handleIncrement}>Increment</button>
        <button onClick = {handleDecrement}>Decrement</button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        ctr: state.counter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => dispatch({type: 'INCREMENT'}),
        onDecrement: () => dispatch({type:'DECREMENT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

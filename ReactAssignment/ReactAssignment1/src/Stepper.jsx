import { Component } from "react";

class Counter extends Component {
    constructor () {
        super()
        this.state = {
            counterValue:0
        }
    }
    
    modIncrementUp = () => {
        this.setState({
            counterValue: this.state.counterValue + 1 
        })
    }
    render() {

        return (
            <>
            <h1>{this.state.counterValue}</h1>
            <button onClick={this.modIncrementUp}>+</button>
            </>
        )
    }
}

export default Stepper
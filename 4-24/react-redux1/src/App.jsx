import './App.css'
import Counter from "../components/Counter"
import AddSub from "../components/AddSub"
import ToDo from '../components/ToDo';
import { connect } from "react-redux";

function App(props) {

  return (
    <>
    <h1>{props.counterValue}</h1>
    {/* <Counter/> */}
    <ToDo/>
    {/* <AddSub /> */}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    counterValue: state.counter
  }
}

export default connect(mapStateToProps)(App)
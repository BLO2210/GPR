import { connect } from "react-redux";

function CartCount(props) {
    return (
        <>
        Cart: {props.noOfCartItems}
        </>
    )
}
const mapStateToProps = (state) => {
    console.log(state.booksR.cart.length)
    return {
        noOfCartItems: state.booksR.cart.length
    }
}

export default connect(mapStateToProps)(CartCount)
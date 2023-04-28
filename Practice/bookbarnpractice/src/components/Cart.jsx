import { connect } from "react-redux";

function Cart(props) {
    return (
        <>
        Cart: {props.noOfCartItems}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        noOfCartItems: state.booksR.cart.length
    }
}

export default connect(mapStateToProps)(Cart)
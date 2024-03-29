import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {

    const navigate = useNavigate()

    useEffect(() => {

        if(!props.isAuth) {
            navigate('/login')
        }
    })
    return props.children

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.booksR.isAuthenticated
    }
}

export default connect(mapStateToProps)(ProtectedRoute)
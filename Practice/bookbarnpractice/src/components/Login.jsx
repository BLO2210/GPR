import { useState } from "react"
import { connect } from "react-redux"
import { useNavigate, useNavigation } from 'react-router-dom'

function Login(props) {

    const [user, setUser] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate() 

    //saving values in local state
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin =  async () => {

        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        console.log(user)
        
        const result = await response.json()
        if(result.success) {
            //save token in local storage
            localStorage.setItem('jwtToken', result.token)
            props.onLogin(result.token)
            navigate('/home')
        } else {
                setErrorMessage(result.message)
        }
        console.log(result)

    }

    return (

        <>
        <h1>Login</h1>
        <input type = "text" placeholder = "Username" name = "username" onChange = {handleChange} />
        <input type = "password" placeholder = "password" name = "password" onChange={handleChange} />
        <button onClick={handleLogin}>Login</button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({type: 'ON_LOGIN', payload: token})
    }
}

export default connect(null, mapDispatchToProps)(Login)
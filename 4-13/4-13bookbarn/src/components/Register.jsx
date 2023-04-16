import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()

    const [newUser, setnewUser] = useState({
        username: "",
        password: ""
    })

    const handleRegisterInput = (e) => {
        const {name, value } = e.target
        setnewUser((prevnewUser) => ({
            ...prevnewUser,
            [name]: value
        }))
    }

    // const handleRegister = async () => {
    //     const response = await fetch('http://localhost:8080/register', {
    //         method: "POST",
    //         headers : {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newUser)
    //     })
    //     // .then (res => res.json())
    //     // console.log(response)
        
    //     // navigate ('/')
    //     // const saveUser = await response.json()
    //     // if(saveUser) {
    //     //     navigate('/')
    //     // }else {

    //     }

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
    
            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Registration failed.');
            }
        } catch (error) {
            console.error(error);
        }
    }
    

  return(
    <>

    <h1>REGISTER</h1>
    <input type = "text" name = "username" placeholder = "username" onChange={handleRegisterInput} />
    <input type = "text" name = "password" placeholder = "password" onChange={handleRegisterInput} />
    <button onClick = {handleRegister}>Register New User</button>
    </>
  )
}

export default Register
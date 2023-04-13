import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AddBook() {
    const navigate = useNavigate()

    const [newBook, setNewBook] = useState({
        bookTitle: "",
        bookGenre:"",
        bookPublisher:"",
        bookYear:"",
        bookImageURL:""
    })

    const captureInput = (e) => {
        const { name, value } = e.target

        setNewBook((prevNewBook) => ({
            ...prevNewBook,
            [name]: value,
        }))
    }
    const addBook = async () => {
        const reponse = await fetch ('http://localhost:8080/api/add-book', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
        })

        navigate('/')
    }

    return(
        <>
        <input type="text" placeholder="title" name="bookTitle" onChange={captureInput}/>
        <input type="text" placeholder="genre" name="bookGenre" onChange={captureInput}/>
        <input type="text" placeholder="publisher" name="bookPublisher" onChange={captureInput}/>
        <input type="number" placeholder="year" name="bookYear" onChange={captureInput}/>
        <input type="text" placeholder="imageURL" name="bookImageURL" onChange={captureInput}/>
        <button onClick={addBook}>Add</button>
        </>
    )
}


export default AddBook
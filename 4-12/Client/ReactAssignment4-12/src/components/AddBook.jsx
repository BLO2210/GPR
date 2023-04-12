import { Component } from "react";


class AddBook extends Component {

    constructor() {
        super(),
        this.state = {
            bookTitle: "",
            bookGenre: "",
            bookPublisher: "",
            bookYear: 0,
            bookImageURL: "",
        }
    }

    input = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addBook = async () => {
        const response = await fetch('http://localhost:8080/api/add-book', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)            
        })
        const result = await response.json()
        console.log(result)
    }

    render() {
        return(

            <>
               
                <input type="text" placeholder="title" name="bookTitle" onChange={this.input}/>
                <input type="text" placeholder="genre" name="bookGenre" onChange={this.input}/>
                <input type="text" placeholder="publisher" name="bookPublisher" onChange={this.input}/>
                <input type="number" placeholder="year" name="bookYear" onChange={this.input}/>
                <input type="text" placeholder="imageURL" name="bookImageURL" onChange={this.input}/>
                <button onClick={this.addBook}>Add</button>
            </>
        )
    }
}

export default AddBook
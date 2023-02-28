const coffeeView = document.getElementById("coffeeView")
const emailView = document.getElementById("emailView")

let emailTextBox = document.getElementById("emailTextBox")
let typeTextBox = document.getElementById("typeTextBox")
let sizeTextBox = document.getElementById("sizeTextBox")
let priceTextBox = document.getElementById("priceTextBox")
let emailSearchTextBox = document.getElementById("emailSearchTextBox")

let submitButton = document.getElementById("orderButton")
let searchButton = document.getElementById("searchButton")

let emailDeleteTextBox = document.getElementById("emailDeleteTextBox")
let deletebutton = document.getElementById("deleteButton")

submitButton.addEventListener('click',createCoffeeOrder)
searchButton.addEventListener('click',retrieveOrder)
deletebutton.addEventListener('click',deleteByEmail)


function gatherOrders() {
    const reqView = new XMLHttpRequest()

   reqView.addEventListener('load', function() {
    const coffeeParse = JSON.parse(this.responseText)
    //console.log(coffeeParse)
    const coffeeOrders = coffeeParse.map((order) => {
        return `<div>
            <li>${order.email}</li>
            <li>${order.type}</li>
            <li>${order.size}</li>
            <li>${order.price}</li>
            </div>`
    })
   console.log(coffeeOrders)
   coffeeView.innerHTML += coffeeOrders.join('')
})
reqView.open('GET',`https://troubled-peaceful-hell.glitch.me/orders`)
reqView.send()
}



    

function createCoffeeOrder() {
    const reqSubmit = new XMLHttpRequest()
    reqSubmit.open('POST', `https://troubled-peaceful-hell.glitch.me/orders`)

    const body = {
        email: emailTextBox.value,
        type: typeTextBox.value,
        size: sizeTextBox.value,
        price: priceTextBox.value
    }
    reqSubmit.setRequestHeader('Content-type', 'application/json')

    reqSubmit.send(JSON.stringify(body))
    coffeeView.innerHTML = ""
    gatherOrders()
}


function retrieveOrder() {
    const reqSearch = new XMLHttpRequest()
    reqSearch.addEventListener('load',function () {
        const parsedOrder = JSON.parse(this.response)
        console.log(parsedOrder)
        const selectedOrder =  `<div>
        <li>${parsedOrder.email}</li>
        <li>${parsedOrder.type}</li>
        <li>${parsedOrder.size}</li>
        <li>${parsedOrder.price}</li>
        </div>`
        emailView.innerHTML += selectedOrder
    })
    const userEmail = emailSearchTextBox.value
    reqSearch.open('GET', `https://troubled-peaceful-hell.glitch.me/orders/${userEmail}`)
    reqSearch.send()
}


function deleteByEmail() {
    const reqDelete = new XMLHttpRequest()

    const userEmail = emailDeleteTextBox.value

    reqDelete.open('DELETE', `https://troubled-peaceful-hell.glitch.me/orders/${userEmail}`)
    reqDelete.send()
    coffeeView.innerHTML = ""
    gatherOrders()
}


gatherOrders()



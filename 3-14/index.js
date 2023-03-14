const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.engine("mustache", mustacheExpress())

app.set ("views", "./views")
app.set("view engine", "mustache")
app.use(express.urlencoded())

let trips = [{
    title: 'New Orleans', 
    image: 'imgURL',
    departure: '2023-03-10',
    return: '2023-03-14'
}]

app.get('/', (req, res) => {
    res.render('index', {tripsObj: trips})
})

app.get("/addTrip", (req, res) => {
    res.render('add')
})

app.post('/addTrip', (req, res) => {
    const title = req.body.title
    const image = req.body.image
    const departure = req.body.departure
    const arrive = req.body.arrive

    const tripInfo = {
        title: title,
        image: image,
        departure: departure,
        arrive: arrive
    }
    trips.push(tripInfo)

    res.redirect('/')
})

app.listen(8080, () => {
    console.log('Server is running')
})


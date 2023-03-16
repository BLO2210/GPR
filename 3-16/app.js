const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const { rmSync } = require('fs')
// const tripsRouter = require('./routes/trips')



app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.urlencoded())

app.use(session({
    secret: 'Secreto',
    saveUninitialized: false
}))


let users = [{ username: "Billy", password: "Pass" }]

function authenticateUser(req, res, next) {
    if (req.session) {
        if (req.session.username) {
            next()
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login', { errorMessage2: 'You must be logged in to view your trips' })
    }
}

app.get('/login', (req, res) => {
    res.render('login')
})


app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)

    const user = users.find(user => user.username == username && user.password == password)

    if (user) {
        if (req.session) {
            req.session.username = username
            res.redirect('trips')
        }
    } else {
        res.render('login', { errorMessage: 'Login is incorrect' })
    }
})

app.post("/register", (req, res) => {
    let newUsername = req.body.newUsername
    let newPassword = req.body.newPassword
    let existingUser = users.find((user) => {
        return user.username == newUsername
    })

    if(existingUser) {
        res.render("register", {newMessage: "Username already exists."})
    } else {
        let newUser = { username: newUsername, password: newPassword }
        users.push(newUser)
        console.log(users)
        res.redirect('/trips')
    }
})

app.get('/trips', authenticateUser, (req, res) => {
    res.render('trips', { tripsObj: trips })
})

// app.use('/trips', tripsRouter)
app.get('/addTrip', authenticateUser, (req, res) => {
    res.render('addTrip')
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
        arrive: arrive,
        tripID: trips.length +1,
        username: req.session.username
    }
    trips.push(tripInfo)
    

    res.redirect('/trips')
})

app.post('/deleteTrip', (req, res) => {
    const tripID = req.body.tripID
    console.log(tripID)
    trips = trips.filter((trip) => trip.tripID != tripID);
  res.redirect("/trips");
})

let trips = [{}]

app.listen(8080, () => {
    console.log('Server is running')
})
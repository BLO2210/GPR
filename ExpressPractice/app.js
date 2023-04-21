const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(express.urlencoded())
app.engine('mustache', mustacheExpress())
app.set('views', __dirname + '/views')
app.set('view engine', 'mustache')

const Userz = require('./schemas/userz')

function middleware(req,res,next)  { 
    // req.url used here to console log the URL, remember you can use commas to console log multiple things
    console.log(Date(), req.url)
    next()
}

app.use(middleware)


mongoose.connect('mongodb+srv://brandonmichael2210:AoRHZwzwnlbO8elU@cluster0.vjcq3iv.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/api/users', async (req,res) => {
    const users = await Userz.find();
    res.json(users)
})

app.post('/api/users', async (req,res) => {
    const name = req.body.name
    const age = req.body.age

    const newUser = new Userz({
        name: name,
        age: age
})
await newUser.save()
res.json(newUser)    
})


app.delete('/api/users', async (req,res) => {
    const name = req.body.name
    await Userz.findOneAndDelete(name)
    res.json(name)

})

app.listen(8080, () => {
    console.log('Server is up')
})
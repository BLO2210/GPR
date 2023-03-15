const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const movieRouter = require('./routes/movies')

app.engine('mustache', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())
app.use(express.static('static'))

const PORT = 8080

global.movieList = [{
    title: "movie1",
    description: "description",
    genre: "genre1",
    posterURL: "poster",
    id: 2001

}]

global.movieDetails = []
app.use('/movies', movieRouter)





app.listen(PORT, () => {

})
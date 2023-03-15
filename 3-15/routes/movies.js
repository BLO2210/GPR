const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('index', {arr:movieList})
})

router.get('/create', (req, res) => {
    res.render('addMovie')
})

router.post('/create', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const genre = req.body.genre 
    const posterURL = req.body.posterURL

    const newMovie = {
        title: title,
        description: description,
        genre: genre,
        posterURL: posterURL,
        id: movieList.length + 1
    }
    movieList.push(newMovie)
    res.redirect('/movies')
})

router.post('/delete', (req, res) => {
    const id = parseInt(req.body.id)
    movieList = movieList.filter((movie) => 
        movie.id !== id )
    res.redirect('/movies')
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let movie = movieList.filter((movie) => movie.id === id)

    res.render('index', {arr:movie})
})

router.get('/:id', (req, res) => {
    const movieInfo = {
        title: title,
        description: description,
        genre: genre,
        posterURL: posterURL,
        id: req.params.id
    }
    movieDetails.push(movieInfo)
    res.redirect('/')
})




module.exports = router
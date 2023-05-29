const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

app.use(express.json())
app.use(cors())

const authenticate = require('./middlewares/authMiddleware')

//for example


//end of example
const User = require('./schemas/user')
const Book = require('./schemas/book')
const MoviesList = require('./schemas/movieslist')
const { JsonWebTokenError } = require('jsonwebtoken')

mongoose.connect('mongodb+srv://brandonmichael2210:AoRHZwzwnlbO8elU@cluster0.vjcq3iv.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})


app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = new User({
        username: username,
        password: password
    })
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const passwordHash = await bcrypt.hash(password, salt);

    // Replace the password with the hashed password
    user.password = passwordHash;

    try {
        await user.save()
        res.status(200).json({ message: 'Registration successful' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

//functional server side login!
app.post('/api/login', (req, res) => {
    const { username, password } = req.body

  User.findOne({ username })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(401).json({ success: false, message: 'Incorrect username' })
      }
      bcrypt.compare(password, user.password)
        .then(result => {
          console.log(result)
          if (!result) {
            return res.status(401).json({ success: false, message: 'Incorrect password' })
          }

          const token = jwt.sign({ username }, 'SECRETKEY')
          //made changes below, added userId
          res.json({ success: true, token, userId: user._id})
        })
        .catch(err => {
          return res.status(500).json({ success: false, message: 'Internal server error' })
        })
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: 'Internal server error' })
    })
})


          //potentially delete below

// app.post('/:userId/addMovies', async ( req, res) => {
//   const poster = req.body.movie[0]
//   const title = req.body.movie[1]
//   const userId = req.params.userId

//   const addMovieToList = new MoviesList({
//     poster: poster,
//     title: title
//   })
//   try {
//     await User.findByIdAndUpdate(userId, {moviesList: addMovieToList})
//     //trying this

//     // user.moviesList.push(moviesList)
//     // await user.save()
//     await addMovieToList.save()
//     res.status(201).json(addMovieToList)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({message : 'Server Error'})
//   }
  // await moviesList.save()
  // User.moviesList.push(moviesList)
  // res.json(moviesList)
// })

// app.post('/api/add-book', async (req, res) => {
//     const bookTitle = req.body.bookTitle
//     const bookGenre = req.body.bookGenre
//     const bookPublisher = req.body.bookPublisher
//     const bookYear = req.body.bookYear
//     const bookImageURL = req.body.bookImageURL

//     const book = new Book({
//         bookTitle:bookTitle,
//         bookGenre:bookGenre,
//         bookPublisher:bookPublisher,
//         bookYear:bookYear,
//         bookImageURL:bookImageURL
//     })
//     await book.save()
//     res.json(book)
// })

app.post('/:userId/addMovies', async (req, res) => {
  const poster = req.body.movie[0];
  const title = req.body.movie[1];
  const userId = req.params.userId;

  try {
    // Find the current user's document in the User collection
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.moviesList) {
      // If the user has no movies yet, create a new array with the first movie
      user.moviesList = [{ poster, title }];
    } else {
      // If the user already has movies, add the new movie to the array
      user.moviesList.push({ poster, title });
    }

    // Save the updated user document to the database
    await user.save();

    res.status(201).json(user.moviesList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.put(`/users/:userId/movies/:movieId`, async (req, res) => {
  const {userId, movieId} = req.params
  const checkboxName = Object.keys(req.body)[0];
  const checkboxValue = req.body[checkboxName]

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    const movie = user.moviesList.find((movie) => movie._id.toString() === movieId)

    if (!movie) {
      return res.status(404).json({error: "Movie not found"})
    }

    movie[checkboxName] = checkboxValue

    await user.save()

    res.json(movie)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error")
  }
})



app.get('/users/:userId/movies', async (req, res) => {
  try {
  const userId = req.params.userId
  const user = await User.findById(userId)
  const moviesList = user.moviesList
  res.json(moviesList)
  } catch (err) {
    console.error(err)
    res.status(500).json({message: 'Error retrieving list'})
  }
})

// app.get('http://www.omdbapi.com/?apikey=[9efdd8db]&', async (req, res) => {
//   const movies = await 
// })


app.listen(8080, () => {
    console.log('Server is up')
})
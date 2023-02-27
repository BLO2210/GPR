let moviesList = document.getElementById("moviesList")
const moviesArr = movies.Search
let userTitle = document.getElementById("userTitle")
let userYear = document.getElementById("userYear")
let userPoster = document.getElementById("userPoster")

let currentMovies = moviesArr.map(function(movie) {
    return `<li>
    <div>${movie.Title}</div>
    <div>${movie.Year}</div>
    <img src = "${movie.Poster}" />
    </li>`
})

moviesList.innerHTML =currentMovies


// function addMovie() {
//     let newMovie = {
//         Title: `${newMovieTitle.value}`,
//         Year: `${newMovieYear.value}`,
//         Poster: `${newPosterURL.value}`
//     }
//     moviesArr.unshift(newMovie)

//     generateMovies()
// }

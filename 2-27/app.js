
const roster = document.getElementById("movieRoster")
const preview = document.getElementById("preview")

function generateRoster() {
    const request = new XMLHttpRequest()


request.addEventListener('load',function() {
    //console.log(this)
    const movieParse = JSON.parse(this.responseText)
    const movieRoster = movieParse.Search
    const movieLineup = movieRoster.map((x) => {
        return `<div id = "movieCard">
        <a onclick = "generatePreview('${x.imdbID}')">
        <img src = "${x.Poster}" id="poster">
        <p id = "Title">${x.Title}</p>
        </a>
        </div>`
        
    })
    roster.innerHTML +=movieLineup.join("")
})
request.open('GET',`http://www.omdbapi.com/?s=batman&apikey=9efdd8db`)
request.send()
}

function generatePreview(imdbID) {
    const request = new XMLHttpRequest()

    request.addEventListener('load',function() {
        const movieParse = JSON.parse(this.response)

        const moviePreviews = `
        <div class = "bigCard">
        <div class = "main">
        <h1 class = "bigTitle">${movieParse.Title}</h1>
        <img src = "${movieParse.Poster} class="bigPoster">
        </div>
        <div class = "info">
        <p>Year: ${movieParse.Year}</p>
        <p>Rated: ${movieParse.Released}</p>
        <p>${movieParse.Director}</p>
        </div>
        </div>
        `;
        preview.innerHTML = moviePreviews
    })
    let id = imdbID
    request.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=9efdd8db`)
    //http://www.omdbapi.com/?i=insertSelectedimdbIDhere&apikey=insertyourkeyhere
    request.send()
}

generateRoster()

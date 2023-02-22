const newsDisplay = document.getElementById("newsDisplay")
const articles = news.articles
const sourceSelect = document.getElementById("sourceSelect")
const newSources = sources.sources

function filterSources() {
    const filteredArticles = articles.filter((article) => {
      return article.source.name === this.value
    })
      generateArticles(filteredArticles)
  }
  

function generateArticles(filteredArticles) {
    newsDisplay.innerHTML = ""
    const information = filteredArticles.map((article) => {
        return `<li>
        <div>${article.author}</div>
        <div>${article.title}</div>
        <div>${article.description}</div>
        <div>${article.url}</div>
        <img src = "${article.urlToImage}" />
        <div>${article.publishedAt}</div>
        <div>${article.content}</div>
    </li>`
    })
    newsDisplay.innerHTML +=information.join(" ")
    }
    sourceSelect.addEventListener('change',filterSources)
//sources filter
const newsJSnames = articles.map((article) => article.source.name)


    
generateArticles(articles)

const sourceList = newSources.map((source) => {
    return `<option>${source.name}</option>`
})

sourceSelect.innerHTML += sourceList


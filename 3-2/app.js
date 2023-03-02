storyDisplay = document.getElementById("storyDisplay")

async function fetchNumbers() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const numbers = await response.json()
    numbers.map((id) => fetchStory(id))
    //console.log(numbers)
}

async function fetchStory(storyID) {
    
    const id = storyID
    const response = await fetch (`https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`)
    const stories = await response.json()

    const date = new Date(stories.time * 1000)

    const story = `
    <h1>${stories.title}</h1>
    <a  target = "_blank"href="${stories.url}">"Article"</a>
    <p>${stories.by}</p>
    <p>${date.toLocaleDateString("en-US")}</p>
    `
    storyDisplay.innerHTML += story
}

fetchNumbers()
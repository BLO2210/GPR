const listDisplay = document.getElementById("listDisplay")
const inputTitle = document.getElementById("inputTitle")
const inputPriority = document.getElementById("inputPriority")
const inputDate = document.getElementById("inputDate")
const submitButton = document.getElementById("submitButton")

async function displayTasks() {
    const response = await fetch('http://localhost:8080/list')
    const todos = await response.json()
    const tasksParsed = todos.map((task) => {
        return `
    <li>${task.title}</li>
    <li>${task.priority}</li>
    <li>${task.date}</li>
    `
    })
      listDisplay.innerHTML = tasksParsed
}

displayTasks()

async function addTask(t, p, d) {
    const body = {
        title: t,
        priority: p,
        date: d
    }

    const request = await fetch("http://localhost:8080/list", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
}

submitButton.addEventListener('click', function() {
    const todoTitle = inputTitle.value;
    const todoPriority = inputPriority.value;
    const todoDate = inputDate.value;
    addTask(todoTitle, todoPriority, todoDate);
});
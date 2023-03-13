const express = require('express')
const app = express() 
const cors = require('cors')
const todo = []

app.use(express.json())
app.use(cors())

app.listen(8080, () => {
    console.log('Server is running...')
})

app.get('/list', (req, res) => {
    res.status(200).json(todo)
})

app.post('/list', (req, res) => {
    const title = req.body.title
    const priority = req.body.priority
    const date = req.body.date
    const todoItem = {title: title, priority: priority, date: date}
    todo.push(todoItem)
    res.status(200).json({success: true, message: 'Task has been added.'})
})
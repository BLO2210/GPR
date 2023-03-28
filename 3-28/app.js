const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const mongoose = require('mongoose')
app.use(express.urlencoded())

//import here
const Task = require('./schemas/task')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')


mongoose.connect('mongodb+srv://brandonmichael2210:AoRHZwzwnlbO8elU@cluster0.vjcq3iv.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})


app.get('/', (req,res) => {
    res.render('index')
})

app.get('/list', async (req,res) => {
    const tasks = await Task.find({})
    res.render('list', {tasks: tasks})
})


app.post('/add-item', async (req, res) => {
    const taskName = req.body.taskName
    const priority = req.body.priority
    const date = req.body.date

    const task = new Task({
    taskName:taskName,
    taskPriority:priority,
    completedDate: date
})
await task.save()
res.redirect('/list')
})

app.post('/delete-item', async (req, res) => {
    const taskId = req.body.id
    await Task.findByIdAndDelete(taskId)
    res.redirect('/list')
})


// app.post('/update-item', async (req, res) => {
//     const taskId = req.body.id
//     const taskName = req.body.taskName
//     const priority = req.body.priority
//     const date = req.body.date

//     const taskToUpdate = {
//         taskName:taskName,
//         taskPriority:priority,
//         completedDate: date
//     }
//     const updatedTask = await Task.findByIdAndUpdate(taskId, taskToUpdate)
//     res.redirect('/list')
// })

app.post('/toUpdate', async (req, res) => {
    const taskId = req.body.id
    const item = await Task.findById(taskId)
    res.render('update', item)
})

app.post('/update-task', async (req, res) => {
    const taskId = req.body.id
    const taskToUpdate = {
                taskName:req.body.taskName,
                taskPriority:req.bodypriority,
                completedDate: req.body.date
}
await Task.findByIdAndUpdate(taskId, taskToUpdate)
    res.redirect('/list')
})

app.listen(8080, () => {
    console.log('Server is up')
})
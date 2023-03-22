const express = require('express')
app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const models = require('./models')
app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")
app.use(express.urlencoded())
const port = 8080

app.use(session({
    secret: "secreto",
    saveUninitialized:false
}))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/blog', async(req, res) => {
    const posts = await models.Post.findAll({})
    res.render('blog', {posts:posts})
})


app.post('/add', async (req, res) => {
    const title = req.body.title
    const body = req.body.body 
    const category = req.body.category 

    const newPost = await models.Post.build({
        title: title,
        body: body,
        category: category
    })
    await newPost.save()
    res.redirect('/blog')
})

app.post('/delete', async (req, res) => {
    await models.Post.destroy({
        where: {
            id: parseInt(req.body.id)
        }
    })
    res.redirect('/blog')
})

app.post('/filter', async (req, res) => {
    const filteredPosts = await models.Post.findAll({
        where: {
            category: req.body.category
        }
    })
    let filteredArr = []
    for(let i = 0; i < filteredPosts.length; i++) {
        const postInfo = {
            id: filteredPosts[i].dataValues.id,
            title: filteredPosts[i].dataValues.title,
            body: filteredPosts[i].dataValues.body
        }
        filteredArr.push(postInfo)
    }
    res.render('blog', {posts: filteredArr})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
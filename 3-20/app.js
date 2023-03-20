const { urlencoded } = require('body-parser');
const express = require('express')
const mustacheExpress = require('mustache-express');
const { Session } = require('node:inspector');
const app = express()
const port = 8080
const path = require('node:path');
const pgp = require('pg-promise')()
const connectionString = 'postgres://fwgbxukm:giNbM72gSNSDbDHMsqBGNeKAVkIAcH9M@ruby.db.elephantsql.com/fwgbxukm'
const db = pgp(connectionString)
const session = require('express-session')
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(express.static('public'))
app.use(urlencoded())

app.use(session({
    secret:'secreto',
    saveUninitialized: false
}))

app.get('/', (req,res) => {
    res.render('login')
})

app.get('/index', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    res.redirect('index')
})

app.get('/blog', async (req, res) => {

    const blogPosts = await db.any('SELECT id, title, body, date_created, date_updated FROM blog')

    res.render('blog', { blogPosts: blogPosts})
})

app.post('/new-post',async (req, res) => {
    const blogTitle = req.body.blogTitle
    const blogBody = req.body.blogBody
    console.log(blogTitle)

    await db.none('INSERT INTO blog(title, body) VALUES($1,$2)', [blogTitle, blogBody])
    res.redirect('blog')
})

app.post('/delete-post', async (req, res) => {

    const id = parseInt(req.body.id)
    await db.none('DELETE FROM blog WHERE id = $1',[id])
    res.redirect('blog')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

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
const bcrypt = require('bcryptjs')
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

app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let user = await db.oneOrNone('SELECT id, username, password from users WHERE username = $1', [username])
    if(user) {
        const result = await bcrypt.compare(password, user.password)
        if(result) {
            if(req.session) {
                req.session.userid = user.id
            }
            res.redirect('blog')
        } else {
            res.render('login', {errorMessage: 'Invalid Login.'})
        }
    } else {
        res.render('login', {errorMessage: 'Invalid Login'})
    }
})

app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password 

    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)

    await db.none('INSERT INTO users(username, password) VALUES($1,$2)', [username, hashedPassword])
    res.redirect('login')
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

const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const models = require('./models')

const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('js'))

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.urlencoded())
require('dotenv').config()
const { Op } = require('sequelize');



app.use(session({
    secret: process.env.secret,
    saveUninitialized: false
}))

let chatMessages = []

// socket connection is made
io.on('connection', (socket) => {
    console.log('User connected')
    io.emit('General-Joined', chatMessages)

    // listening for general channel
    socket.on('General', chat => {
        chatMessages.push(chat)
        io.emit('General', chat)
    })

})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/js/chat.html')
})

app.get('/blog', async (req, res) => {
    const posts = await models.Post.findAll({
        include: [
            {
                model:models.Comment,
                as: 'comments'
            }
        ]
    })
    res.render('blog', { posts: posts })
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

app.post('/add-comment', async (req, res) => {
    const commentTitle = req.body.commentTitle
    const commentBody = req.body.commentBody
    const post_id = parseInt(req.body.post_id)

    const comment = models.Comment.build({
        title: commentTitle,
        body: commentBody,
        post_id: post_id
    })
    await comment.save()
    res.redirect('/blog')
})

app.post("/delete-comment", async (req, res) => {
    const id = parseInt(req.body.commentId)
    const deletedComment = await models.Comment.destroy({
        where: {
            id: id
        }
    })
    res.redirect('/blog')
})

app.post('/delete', async (req, res) => {
    
    await models.Comment.destroy({
        where: {
            id: parseInt(req.body.id)
        }
    })

    await models.Post.destroy({
        where: {
            id: parseInt(req.body.id)
        }
    })
   
    res.redirect('/blog')
})


app.post('/search', async (req, res) => {
    const query = req.body.searchBar;
    const posts = await models.Post.findAll({
        where: {
            [Op.or]: [
                {title: {[Op.iLike]: `%${query}%`}},
                {body: {[Op.iLike]: `%${query}%`}}
            ]
        },
        include: [{model: models.Comment, as: 'comments'}]
    });
    res.render('blog', {posts}); 
})


app.post('/filter', async (req, res) => {
    const filteredPosts = await models.Post.findAll({
        where: {
            category: req.body.category
        }
    })
    let filteredArr = []
    for (let i = 0; i < filteredPosts.length; i++) {
        const postInfo = {
            id: filteredPosts[i].dataValues.id,
            title: filteredPosts[i].dataValues.title,
            body: filteredPosts[i].dataValues.body
        }
        filteredArr.push(postInfo)
    }
    res.render('blog', { posts: filteredArr })
})

app.post("/filterDate", async (req, res) => {
    if (req.body.filterDate === "recent") {
      const posts = await models.Post.findAll({
        include: {
          model: models.Comment,
          as: "comments",
        },
        order: [["createdAt", "DESC"]],
      });
      res.render("blog", {
        posts: posts,
        user: req.session.user,
      });
    }
  
    if (req.body.filterDate === "oldest") {
      const posts = await models.Post.findAll({
        include: {
          model: models.Comment,
          as: "comments",
        },
        order: [["createdAt", "ASC"]],
      });
      res.render("blog", {
        posts: posts,
        user: req.session.user,
      });
    }
  });
  
http.listen(process.env.port, () => {
    console.log(`Example app listening on port ${process.env.port}`)
})
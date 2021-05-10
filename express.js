// --Course 6--
// "npm install express" adalah cara menginstall express yang merupakan framework dari node js

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


const app = express()
const dbURI = 'mongodb+srv://jerdasi:jerjer@nodeccjeremia.pkhis.mongodb.net/MNE-DB?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => {
        console.log("Connected")
        app.listen(3001)
    })
    .catch( (err) => {
        console.log(err)
    })

//register view engine
app.set('view engine', 'ejs')

app.use(express.static('public')) //Membuat sebuah folder yang berisi file static yang dapat diakses
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true})) //middleware diperlukan untuk method post


app.get('/', (req, res) => {
    // // res.write("<h1>Home</h1>")
    // // res.end()
    // // res.sendFile('./views/blogs.html', {root: __dirname}) //Return File HTML
    // const blogs = [
    //     {title: 'Tes 1', snippet: 'Ini merupakan Blog 1'},
    //     {title: 'Tes 2', snippet: 'Ini merupakan Blog 2'},
    //     {title: 'Tes 3', snippet: 'Ini merupakan Blog 3'},
    // ]
    // res.render('index', { title : 'Home' , blogs})

    // redirect ke router /blogs
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.sendFile('./views/form.html', {root: __dirname}) 
    res.render('about', { title : 'About' })
})

//Redirect
app.get('/blogs/create', (req, res) => {
    res.render('create', { title : 'Create' })
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log((err))
        })
    
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then( (result) => {
            res.redirect('/blogs')
        })
        .catch( (err) => {
            console.log(err)
        })
})

//404 Page, app.use itu method menerima semua request tidak peduli path nya apa, jadi cocok untuk 404 page dan letaknya harus paling bawah
app.use((req, res) => {
    // res.sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404', { title : 'Error404' })
})


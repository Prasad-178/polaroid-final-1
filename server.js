const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const userRouter = require('./routes/user')
const searchRouter = require('./routes/search')
const initializeDB = require('./database/initialize')
const session = require('./session/session')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('polaroid', { check: session.isLoggedIn })
})

app.get('/about', (req, res) => {
    res.render('aboutus', {check: session.isLoggedIn})
})

app.get('/films', (req, res) => {
    res.render('films', {check: session.isLoggedIn})
})

app.get('/profile', (req, res) => {
    res.render('profile', {check: session.isLoggedIn})
})

app.post('/bookingdetails', (req, res) => {
    res.redirect('/booking')
})

app.post('/booking', (req, res) => {
    res.redirect('/payment')
})

app.get('/film', (req, res) => {
    const genres = ["Action", "Adventure"]
    const cast = ["Tom Cruise", "Jeremy Renner", "Simon Pegg", "Rebecca Ferguson"]
    res.render('film', {arr: genres, rating: 3.6, cast: cast, check: session.isLoggedIn})
})

app.use('/user', userRouter)

app.use('/search', searchRouter)

app.get('/listsearch', (req, res) => {
    res.render('list_search', {check: session.isLoggedIn})
})

app.get('/lists', (req, res) => {
    res.render('lists', {check: session.isLoggedIn})
})

app.get('/booking', (req, res) => {
    res.render('booking', {check: session.isLoggedIn})
})

app.get('/success', (req, res) => {
    res.render('success')
})

app.get('/bookingdetails', (req, res) => {
    res.render('userDetails', {check: session.isLoggedIn})
})

app.get('/faq', (req, res) => {
    res.render('faq', {check: session.isLoggedIn})
})

app.get('/payment', (req, res) => {
    res.render('payment', {check: session.isLoggedIn})
})

app.get('/listpage', (req, res) => {
    res.render('list_page', {check: session.isLoggedIn})
})

app.get('*', (req, res) => {
    res.render('404', {check: session.isLoggedIn})
})

app.listen(3500, () => {
    console.log("Server live on port 3500!")
    initializeDB()
})


// app.get('/movie/:id', async (req, res) => {
    //     const id = req.params.id
    //     const details = await getMovieById(id)
    
//     res.status(200).json(details)
// })

app.get('/movie', async (req, res) => {
    const name = "mission"
    const details = await getMovieByName(name)
    console.log(details)

    res.status(200).json(details)
})
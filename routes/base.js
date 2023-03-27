const { Router } = require('express')
const session = require('../session/session')
const router = Router()

// router.use('/', check)

router.get('/listsearch', (req, res) => {
    res.render('list_search', {check: session.isLoggedIn})
})

router.get('/lists', (req, res) => {
    res.render('lists', {check: session.isLoggedIn})
})

router.get('/booking', (req, res) => {
    res.render('booking', {check: session.isLoggedIn})
})

router.get('/success', (req, res) => {
    res.render('success')
})

router.get('/bookingdetails', (req, res) => {
    res.render('bookingdetails', {check: session.isLoggedIn})
})

router.get('/faq', (req, res) => {
    res.render('faq', {check: session.isLoggedIn})
})

router.get('/payment', (req, res) => {
    res.render('payment', {check: session.isLoggedIn})
})

router.get('/listpage', (req, res) => {
    res.render('list_page', {check: session.isLoggedIn})
})


router.get('/', (req, res) => {
    res.render('polaroid', { check: session.isLoggedIn })
})

router.get('/about', (req, res) => {
    res.render('aboutus', {check: session.isLoggedIn})
})

router.get('/films', (req, res) => {
    res.render('films', {check: session.isLoggedIn})
})

router.get('/profile', (req, res) => {
    res.render('profile', {check: session.isLoggedIn})
})

router.post('/bookingdetails', (req, res) => {
    res.redirect('/booking')
})

router.post('/booking', (req, res) => {
    res.redirect('/payment')
})

router.get('/film', (req, res) => {
    const genres = ["Action", "Adventure"]
    const cast = ["Tom Cruise", "Jeremy Renner", "Simon Pegg", "Rebecca Ferguson"]
    res.render('film', {arr: genres, rating: 3.6, cast: cast, check: session.isLoggedIn})
})

module.exports = router
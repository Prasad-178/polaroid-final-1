const { Router } = require('express')
const login = require('../controllers/user/login')
const logout = require('../controllers/user/logout')
const register = require('../controllers/user/register')
const appendToList = require('../controllers/list/appendItemToList')
const createList = require('../controllers/list/createList')
const verifyToken = require('../middleware/verifyToken')
const session = require('../session/session')
const router = Router()

router.get('/login', (req, res) => {
    res.render('login', { error: "" })
})

router.get('/register', (req, res) => {
    res.render('register', { error: "" })
})

router.post('/login', login)

router.post('/register', register)

router.post('/createlist', createList)

router.post('/addtolist', appendToList)

router.get('/settings', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('/user/login')
        return
    }
    res.render('settings', { check: session.isLoggedIn, username: session.username, email: session.email })
    console.log(session)
})

router.get('/watchedfilms', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('watched_films', {check: true})
})

router.get('/list', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('user_list', {check: true})
})

router.post('/logout', logout)

module.exports = router

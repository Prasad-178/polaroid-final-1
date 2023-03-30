const { Router } = require('express')
const router = Router()
const db = require('../database/create')
const session = require('../session/session')

// get request on /login
router.get('/login', (req, res) => {
    if (session.isLoggedIn===true) {
        res.redirect('settings')
        return
    }
    res.render('login', {error: ""})
})

// get request on /register
router.get('/register', (req, res) => {
    if (session.isLoggedIn===true) {
        res.redirect('settings')
        return
    }
    res.render('register', {error: ""})
})

// get request on /settings
router.get('/settings', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('settings', {check: true, email: session.email, username: session.username})
})

router.get('/watchedfilms', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('watched_films', {check: true})
})

router.get('/watchlist', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('watchlist', {check: true})
})

router.get('/list', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('user_list', {check: true})
})

//post request on login page
router.post('/login', (req, res) => {
    //getting email and password from body of request
    const { email, password } = req.body
    // console.log(req.body)

    // query to find user having a specific email
    const query = "select * from user where email=?"

    db.get(query, email ,(err, row) => {
        console.log("row is : ", row)
        if (err) {
            res.render('login', { error: "Internal server error!" })
            return
        }

        // if there is a user with email
        if (row) {
            console.log(row)

            // if password in db is different from entered password
            if (row.password !== password) {
                console.log("wrong password!")
                res.render('login', { error: "The password you have entered is wrong!!" })
                return
            }

            // if password is correct
            res.status(200).redirect('/')
            console.log("Logged in successfully!")

            // setting session variables
            session.email = email
            session.isLoggedIn = true
            session.username = row.username
        }

        // if there is no user with the entered email
        else {
            console.log("No such user exists!")
            res.render('login', { error: "No such user exists!" })
        }
    })
})

// post request in register page
router.post('/register', (req, res) => {
    // getting email, username, and password from body of request
    const { email, username, password } = req.body

    // if function is guaranteed to finish executing before the next one starts
    db.serialize(() => {
        // query to get user based on email
        const query = "select * from user where email=?"
        db.get(query, email, (err, row) => {
            // if user is found with the email
            if (row) {
                console.log(row)

                res.render('register', { error: "User with this email already exists!!" })
                return
            }

            if (err) {
                console.log("..", err)
                res.render('register', { error: "Internal server error!" })
                return
            }

            // query to find a user based on his username
            const query2 = "select * from user where username=?"
            db.get(query2, username, (err, row) => {
                // if such a user exists
                if (row) {
                    res.render('register', { error: "User with this username already exists!!" })
                    return
                }

                if (err) {
                    console.log("ggg", err)
                    res.render('register', { error: "Internal server error!" })
                    return
                }

                // creating the user in the database
                const post = "insert into user (email, username, bio, password) values (?, ?, ' ', ?)"
                db.run(post, [email, username, password], (err, row) => {
                    if (err) {
                        console.log("kek", err)
                        res.render('register', { error: "Internal server error!" })
                        return
                    }

                    // if no error then success!
                    console.log("Added successfully!")
                    res.redirect('/user/login')
                })
            })
        })
    })
})

router.get('/sign-out', (req, res) => {
    console.log("Logged out!")
    session.isLoggedIn = false
    session.email = ""
    session.username = ""

    res.redirect('/')
})

router.put('/settings', (req, res) => {

})

module.exports = router

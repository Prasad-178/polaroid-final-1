const { Router } = require('express')
const router = Router()
const db = require('../database/create')
const session = require('../session/session')

router.get('/login', (req, res) => {
    if (session.isLoggedIn) {
        res.redirect('settings')
        return
    }
    res.render('login', {error: ""})
})

router.get('/register', (req, res) => {
    res.render('register', {error: ""})
})

router.get('/settings', (req, res) => {
    if (!session.isLoggedIn) {
        res.redirect('login')
        return
    }
    res.render('settings', {check: true, email: session.email, username: session.username})
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const query = "select * from user where email=?"
    
    db.get(query, email ,(err, row) => {
        console.log("row is : ", row)
        if (err) {
            res.render('login', { error: "Internal server error!" })
            return
        }

        if (row) {
            console.log(row)

            if (row.password !== password) {
                console.log("wrong password!")
                res.render('login', { error: "The password you have entered is wrong!!" })
                return
            }
            
            res.status(200).redirect('/')
            console.log("Logged in successfully!")

            session.email = email
            session.isLoggedIn = true
            session.username = row.username
        }

        else {
            console.log("No such user exists!")
            res.render('login', { error: "No such user exists!" })
        }
    })
})

router.post('/register', (req, res) => {
    const { email, username, password } = req.body
    
    db.serialize(() => {
        const query = "select * from user where email=?"
        db.get(query, email, (err, row) => {
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

            const query2 = "select * from user where username=?"
            db.get(query2, username, (err, row) => {
                if (row) {
                    res.render('register', { error: "User with this username already exists!!" })
                    return
                }

                if (err) {
                    console.log("ggg", err)
                    res.render('register', { error: "Internal server error!" })
                    return
                }

                const post = "insert into user (email, username, bio, password) values (?, ?, ' ', ?)"
                db.run(post, [email, username, password], (err, row) => {
                    if (err) {
                        console.log("kek", err)
                        res.render('register', { error: "Internal server error!" })
                        return
                    }
                    console.log("Added successfully!")
                    res.redirect('/user/login')
                })
            })
        })
    })
})

router.post('/settings', (req, res) => {
    console.log("Logged out!")
    session.isLoggedIn = false
    session.email = ""
    session.username = ""

    res.redirect('/user/login')
})

router.put('/settings', (req, res) => {
    
})

module.exports = router
const { Router } = require('express')
const router = Router()
const session = require('../session/session')

router.get('/', (req, res) => {
    res.render('search', {check: session.isLoggedIn})
})

// router.post()

module.exports = router
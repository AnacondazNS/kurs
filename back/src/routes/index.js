const router = require('express')()
const auth = require('../middlewares/auth')

const user = require('./user')
const book = require('./book')
const review = require('./review')
const genre = require('./genre')

router.use('/user', user)
router.use('/book', auth, book)
router.use('/review', auth,review)
router.use('/genre', auth,genre)

module.exports = router
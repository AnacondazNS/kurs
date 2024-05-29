const router = require('express')()
const review = require('../controllers/review')

router.get('/book/:id', review.getByBookId.bind(review))
router.post('/book/:id', review.add.bind(review))
router.delete('/book/:id', review.delete.bind(review))

module.exports = router
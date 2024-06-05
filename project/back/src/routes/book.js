const book = require('../controllers/book')

const router = require('express')()
 
router.get('/', book.list.bind(book))
router.get('/unpublish', book.unpublishList.bind(book))
router.get('/popular', book.getPopularList.bind(book))
router.get('/genre/:id', book.getByGenreId.bind(book))
router.post('/one/', book.createBook.bind(book))
router.get('/one/:id', book.getById.bind(book))
router.put('/one/:id', book.update.bind(book))
router.delete('/one/:id', book.deleteById.bind(book))
router.get('/preview/:id', book.getPreviewById.bind(book))
router.get('/reader-book/:id', book.getPDFByBookId.bind(book))
router.post('/bookmark/:id', book.setBookMark.bind(book))
router.get('/bookmark/:id', book.getBookMark.bind(book))
router.get('/search', book.search.bind(book))

module.exports = router
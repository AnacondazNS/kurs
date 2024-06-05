const router = require('express')()
const genre = require('../controllers/genre')

router.get('/', genre.list.bind(genre))
router.post('/', genre.create.bind(genre))
router.delete('/:id', genre.remove.bind(genre))
router.put('/:id', genre.update.bind(genre))
router.get('/:id', genre.getById.bind(genre))
router.get('/preview/:id', genre.getPreviewById.bind(genre))

module.exports = router
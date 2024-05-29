const user = require('../controllers/user')
const auth = require('../middlewares/auth')
const router = require('express')()

router.get('/me', auth, user.me.bind(user))
router.post('/login', user.login.bind(user))
router.post('/register', user.register.bind(user))
router.get('/auth',auth, user.check.bind(user))

module.exports = router
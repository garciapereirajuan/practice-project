const express = require('express')
const UserController = require('../controllers/user')

const router = express.Router() //también llamado "api"

router.post('/sign-up', UserController.signUp)

module.exports = router

const express = require('express')
const postsRoutes = require('./posts.js')

const router = express.Router()

router.use('/posts', postsRoutes)

module.exports = router

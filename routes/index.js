const express = require('express')
const { engine } = require('express-handlebars')
const router = express.Router()
const db = require('../config/mongoose')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router

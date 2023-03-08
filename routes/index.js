const express = require('express')
const router = express.Router()
require('../config/mongoose')
const generateShortUrl = require('../utils/generateShortUrl')
const URL = require('../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  let shortUrl = generateShortUrl()
  const originalUrl = req.body.url
  if (!originalUrl) return res.redirect('/')

  // 利用findOne查詢資料庫有無相同的URL，findOne 有找到資料回傳Object 找不到會回傳null
  URL.findOne({ originalUrl })
    .then((data) => (data ? data : URL.create({ originalUrl, shortUrl })))
    .then((data) => {
      res.render('index', {
        originalUrl,
        origin: req.headers.origin,
        shortUrl: data.shortUrl,
      })
    })
    .catch((error) => console.log(error))
})

module.exports = router

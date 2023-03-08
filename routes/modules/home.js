const express = require('express')
const router = express.Router()
const generateShortUrl = require('../../utils/generateShortUrl')
const URL = require('../../models/url')

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

router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params
  URL.findOne({ shortUrl })
    .then((data) => {
      if (!data) return res.status(404).send('<h1>短網址不存在</h1>')
      res.redirect(`${data.originalUrl}`)
    })
    .catch((error) => console.log(error))
})

module.exports = router

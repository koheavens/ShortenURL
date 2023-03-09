const express = require('express')
const router = express.Router()
const generateShortUrl = require('../../utils/generateShortUrl')
const URL = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  try {
    let shortUrl = generateShortUrl()
    const originalUrl = req.body.url
    if (!originalUrl) return res.redirect('/')

    //check shortUrl
    let duplicate = await URL.findOne({ shortUrl })
    while (duplicate) {
      shortUrl = generateShortUrl()
      duplicate = await URL.findOne({ shortUrl })
    }

    let data = await URL.findOne({ originalUrl })
    if (!data) {
      data = await URL.create({ originalUrl, shortUrl })
    }

    res.render('index', {
      originalUrl,
      origin: req.headers.origin,
      shortUrl: data.shortUrl,
    })
  } catch (err) {
    console.log(err)
  }
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

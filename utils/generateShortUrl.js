// 5 組英數亂碼
function generateShortUrl() {
  const BASE_62_CHAR =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  let shortUrl = ''

  for (let i = 1; i <= 5; i++) {
    const randomIndex = Math.floor(Math.random() * BASE_62_CHAR.length)
    shortUrl += BASE_62_CHAR[randomIndex]
  }

  return shortUrl
}

module.exports = generateShortUrl

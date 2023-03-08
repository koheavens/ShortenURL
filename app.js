const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const port = 3000

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

//handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

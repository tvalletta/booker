const express = require('express')
const bodyParser = require('body-parser')
const book = require('./book')

const app = express()
app.use(bodyParser.json())

app.post('/buy', (req, res) => {
  const { qty, prc } = req.body
  book.executeBuyOrder(qty, prc)
  res.send()
})

app.post('/sell', (req, res) => {
  const { qty, prc } = req.body
  book.executeSellOrder(qty, prc)
  res.send()
})

app.get('/book', (req, res) => {
  res.send(book.getBook())
})

app.listen(3000, () => console.log('Booker app listening on port 3000!'))

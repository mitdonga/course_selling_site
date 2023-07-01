require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(Routes)

app.listen(port, () => {
  console.log(`Course selling app running on port ${port}`)
})
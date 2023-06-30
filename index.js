const express = require('express')
const Routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(Routes)

app.listen(port, () => {
  console.log(`Course selling app running on port ${port}`)
})
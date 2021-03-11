import express from 'express'

const app = express()
const port = 8888

app.use(express.static('dist'))

app.get('/todos', (req, res) => {
  return res.json([
    { id: 1, title: 'Create Willow', complete: false },
    { id: 2, title: 'Tell folks to use Elm instead', complete: false }
  ])
})

app.listen(port)

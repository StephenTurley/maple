import express from 'express'
import cors from 'cors'

const app = express()
const port = 8888
app.use(cors())
app.options('/todos', cors)
app.get('/todos', (req, res) => {
  return res.json([
    { id: 1, title: 'Create Willow', complete: false },
    { id: 2, title: 'Tell folks to use Elm instead', complete: false }
  ])
})

app.listen(port)

import express from 'express'
import Bundler from 'parcel-bundler'

const app = express()
const port = 8888
const bundler = new Bundler('examples/index.html', {
  watch: true,
  hmr: true,
  sourceMaps: true
})

app.get('/api/todos', (req, res) => {
  return res.json([
    { id: 1, title: 'Create Willow', complete: false },
    { id: 2, title: 'Tell folks to use Elm instead', complete: false }
  ])
})

app.use(bundler.middleware())
app.listen(port)

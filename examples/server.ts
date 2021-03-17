import express, { Response } from 'express'
import Bundler from 'parcel-bundler'
import { map } from 'lodash'

const app = express()
const port = 8888
const bundler = new Bundler('examples/index.html', {
  watch: true,
  hmr: true,
  sourceMaps: true
})

type Todo = { title: string; complete: boolean }

const db: Todo[] = [
  { title: 'Create Willow', complete: false },
  { title: 'Tell folks to use Elm instead', complete: false }
]

app.get('/api/todos', (req, res) => {
  return todos(res, db)
})

app.put('/api/todos/:id', (req, res) => {
  db[parseInt(req.params.id)] = req.body.todo
  return todos(res, db)
})

const todos = (res: Response, db: Todo[]): Response =>
  res.json(map(db, (val, id) => ({ ...val, id: id })))

console.log('Listening on port: http://localhost:', port)
app.use(bundler.middleware())
app.listen(port)

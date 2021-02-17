import { element } from '../browser'
import { Cmd, None } from '../command'

import { div, h1, li, text, ul, Html } from '../html'

type Msg = 'foo' | 'bar'

type Todo = {
  title: string
  complete: boolean
}

type Model = {
  todos: Todo[]
}

const init = (): [Model, Cmd<Msg>] => {
  const todos: Todo[] = [
    { title: 'Create Maple', complete: false },
    { title: 'Tell folks to use Elm instead', complete: false }
  ]

  return [{ todos: todos }, None]
}
const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => [model, None]
const view = (model: Model): Html<Msg> => {
  return div(
    [],
    [
      h1([], [text('Todos!')]),
      ul(
        [],
        model.todos.map((todo) => li([], [text(todo.title)]))
      )
    ]
  )
}

export default element({
  init: init,
  update: update,
  view: view
})

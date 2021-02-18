import { element } from '../browser'
import { Cmd, None } from '../command'
import { div, h1, li, text, ul, Html } from '../html'
import { onClick } from '../html/events'
import { classNames } from '../html/attributes'

type Msg = { type: 'toggle'; id: number }

type Todo = {
  id: number
  title: string
  complete: boolean
}

type Model = {
  todos: Todo[]
}

const init = (): [Model, Cmd<Msg>] => {
  const todos: Todo[] = [
    { id: 1, title: 'Create Maple', complete: false },
    { id: 2, title: 'Tell folks to use Elm instead', complete: false }
  ]
  return [{ todos: todos }, None]
}

const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg.type) {
    case 'toggle':
      const todos = model.todos.map((todo) => {
        if (todo.id === msg.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
      return [{ ...model, todos: todos }, None]
  }
}

const view = (model: Model): Html<Msg> => {
  return div(
    [],
    [
      h1([], [text('Todos!')]),
      ul(
        [],
        model.todos.map((todo) =>
          li(
            [
              todo.complete
                ? classNames('todo', 'todo-complete')
                : classNames('todo'),
              onClick({ type: 'toggle', id: todo.id })
            ],
            [text(todo.title)]
          )
        )
      )
    ]
  )
}

export default element({
  init: init,
  update: update,
  view: view
})

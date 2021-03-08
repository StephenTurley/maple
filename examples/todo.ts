import { element } from '../browser'
import { Cmd, get, none } from '../command'
import { div, h1, li, text, ul, Html } from '../html'
import { onClick } from '../html/events'
import { classNames } from '../html/attributes'

// Msg

type Msg = { type: 'toggle'; id: number } | { type: 'got-todos'; todos: Todo[] }

// Model

type Todo = {
  id: number
  title: string
  complete: boolean
}

type Model = {
  todos: Todo[]
}

// init

const init = (): [Model, Cmd<Msg>] => {
  const todos: Todo[] = [
    // { id: 1, title: 'Create Willow', complete: false },
    // { id: 2, title: 'Tell folks to use Elm instead', complete: false }
  ]
  return [
    { todos: todos },
    get('http://localhost:8888/todos', { type: 'got-todos', todos: [] })
  ]
}

// update

const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg.type) {
    case 'toggle':
      return [{ ...model, todos: toggle(msg.id, model.todos) }, none]
    case 'got-todos':
      return [{ ...model, todos: msg.todos }, none]
  }
}

const toggle = (id: number, todos: Todo[]): Todo[] => {
  return todos.map((todo) => {
    return todo.id === id ? { ...todo, complete: !todo.complete } : todo
  })
}

// view

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

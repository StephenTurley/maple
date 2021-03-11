import { element } from '../browser'
import { Cmd, get, none } from '../command'
import { button, div, h1, li, text, ul, Html } from '../html'
import { onClick } from '../html/events'
import { classNames } from '../html/attributes'
import { expectJson } from '../expect'
import { JsonDecoder } from 'ts.data.json'

// Msg

type Msg =
  | { type: 'toggle'; id: number }
  | { type: 'got-todos'; todos: Todo[] }
  | { type: 'fetch-todos' }

// Model

export type Todo = {
  id: number
  title: string
  complete: boolean
}

type Model = {
  todos: Todo[]
}

export const todosDecoder = JsonDecoder.array(
  JsonDecoder.object<Todo>(
    {
      id: JsonDecoder.number,
      title: JsonDecoder.string,
      complete: JsonDecoder.boolean
    },
    'todo-decoder'
  ),
  'todos-decoder'
)

// init

const init = (): [Model, Cmd<Msg>] => {
  return [{ todos: [] }, none]
}

// update

const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg.type) {
    case 'toggle':
      return [{ ...model, todos: toggle(msg.id, model.todos) }, none]
    case 'got-todos':
      return [{ ...model, todos: msg.todos }, none]
    case 'fetch-todos':
      return [
        model,
        get(
          'http://localhost:8888/todos',
          expectJson(
            (todos) => ({ type: 'got-todos', todos: todos }),
            todosDecoder
          )
        )
      ]
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
      button([onClick({ type: 'fetch-todos' })], [text('get em')]),
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

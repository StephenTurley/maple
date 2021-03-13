import { element } from '../browser'
import { Cmd, get, none } from '../command'
import { button, div, h1, li, text, ul, Html } from '../html'
import { onClick } from '../html/events'
import { classNames } from '../html/attributes'
import { expectJson } from '../expect'
import { JsonDecoder } from 'ts.data.json'

// Msg

type Msg = { type: 'toggle'; id: number } | { type: 'got-todos'; todos: Todo[] }

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
  return [
    { todos: [] },
    get(
      '/api/todos',
      expectJson((todos) => ({ type: 'got-todos', todos: todos }), todosDecoder)
    )
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

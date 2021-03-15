import { element } from '../src/browser'
import { Cmd, get, none } from '../src/command'
import { button, div, h1, li, p, text, ul, Html } from '../src/html'
import { onClick } from '../src/html/events'
import { classNames } from '../src/html/attributes'
import { expectJson, Result } from '../src/expect'
import { JsonDecoder } from 'ts.data.json'

// Msg

type Msg =
  | { type: 'toggle'; id: number }
  | { type: 'got-todos'; result: Result<Todo[]> }

// Model

export type Todo = {
  id: number
  title: string
  complete: boolean
}

type Error = { state: 'error' }
type Loaded = { state: 'loaded'; todos: Todo[] }
type Loading = { state: 'loading' }

type Model = Loading | Loaded | Error

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
    { state: 'loading' },
    get(
      '/api/todos',
      expectJson(
        (result: Result<Todo[]>) => ({ type: 'got-todos', result: result }),
        todosDecoder
      )
    )
  ]
}

// update

const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg.type) {
    case 'toggle':
      if (model.state === 'loaded') {
        return [{ ...model, todos: toggle(msg.id, model.todos) }, none]
      }
      return [model, none]

    case 'got-todos':
      switch (msg.result.type) {
        case 'success':
          return [{ state: 'loaded', todos: msg.result.value }, none]
        case 'error':
          return [{ state: 'error' }, none]
      }
  }
}

const toggle = (id: number, todos: Todo[]): Todo[] => {
  return todos.map((todo) => {
    return todo.id === id ? { ...todo, complete: !todo.complete } : todo
  })
}

// view

const view = (model: Model): Html<Msg> => {
  return div([], [h1([], [text('Todos!')]), viewState(model)])
}

const viewState = (model: Model): Html<Msg> => {
  switch (model.state) {
    case 'loading':
      return p([], [text('loading...')])
    case 'loaded':
      return viewTodos(model)
    case 'error':
      return p([], [text('Error occurred')])
  }
}
const viewTodos = (model: Loaded): Html<Msg> => {
  return ul(
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
}

export default element({
  init: init,
  update: update,
  view: view
})

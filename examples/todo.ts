import { element } from '../browser'
import { Cmd, None } from '../command'

import { div, Html } from '../html'

type Msg = 'foo' | 'bar'
type Model = {
  todos: string[]
}

const init = (): [Model, Cmd<Msg>] => [{ todos: [] }, None]
const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => [model, None]
const view = (model: Model): Html<Msg> => div([], [])

export default element({
  init: init,
  update: update,
  view: view
})

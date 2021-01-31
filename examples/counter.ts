import { Sandbox, sandbox } from '../browser'
import { div, p, text } from '../html'

type Msg = 'increment'
type Model = number

const app: Sandbox<Model, Msg> = {
  init: () => 0,
  update: (model, msg) => model,
  view: (model) =>
    div(
      [],
      [p([], [text('flerpn')]), p([], [text('derpn')]), p([], [text('workn')])]
    )
}

export default sandbox(app)

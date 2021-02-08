import { Sandbox, sandbox } from '../browser'
import { button, div, h1, p, span, text } from '../html'
import { classNames } from '../html/attributes'

type Msg = 'increment'
type Model = number

const app: Sandbox<Model, Msg> = {
  init: () => 0,
  update: (model, msg) => model,
  view: (model) =>
    div(
      [classNames('container')],
      [
        h1([], [text('Count stuff with Maple!')]),
        div([], [p([], [text('Count: '), span([], [text(model.toString())])])]),
        div(
          [],
          [button([], [text('Decrement')]), button([], [text('Increment')])]
        )
      ]
    )
}

export default sandbox(app)

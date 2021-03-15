import { sandbox } from '../src/browser'
import { Html, button, div, h1, p, span, text } from '../src/html'
import { classNames } from '../src/html/attributes'
import { onClick } from '../src/html/events'

type Msg = 'increment' | 'decrement'
type Model = number

const init = () => 0

const update = (msg: Msg, model: Model) => {
  switch (msg) {
    case 'increment':
      return model + 1
    case 'decrement':
      return model - 1
  }
}

const view = (model: Model): Html<Msg> =>
  div(
    [classNames('container')],
    [
      h1([], [text('Count stuff with Willow!')]),
      div([], [p([], [text('Count: '), span([], [text(model.toString())])])]),
      div(
        [],
        [
          button([onClick('decrement')], [text('Decrement')]),
          button([onClick('increment')], [text('Increment')])
        ]
      )
    ]
  )

export default sandbox({
  init: init,
  update: update,
  view: view
})

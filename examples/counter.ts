import { Sandbox, sandbox } from '../browser'
import { div } from '../html'

type Msg = 'increment'
type Model = number

const app: Sandbox<Model, Msg> = {
  init: () => 0,
  update: (model, msg) => model,
  view: (model) => div([], [])
}

export default sandbox(app)

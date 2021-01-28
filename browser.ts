import { Html } from './html'
import render from './render'

type Sandbox<model, msg> = {
  init: () => model
  update: (model, msg) => model
  view: (model) => Html
}
declare var Maple: {
  init: (HTMLElement) => void
}

function sandbox<model, msg>(sandbox: Sandbox<model, msg>) {
  Maple = {
    init: (root: HTMLElement) => {
      const model = sandbox.init()
      render(root, sandbox.view(model))
    }
  }
}

export { Sandbox, sandbox }

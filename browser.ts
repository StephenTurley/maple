import { Html } from './html'
import render from './render'

interface Sandbox<model, msg> {
  init: () => model
  update: (model, msg) => model
  view: (model) => Html
}

function sandbox<model, msg>(sandbox: Sandbox<model, msg>) {
  return {
    init: (root: HTMLElement) => {
      const model = sandbox.init()
      render(root, sandbox.view(model))
    }
  }
}

export { sandbox }

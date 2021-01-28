import { Html } from './html'
import render from './render'

type Sandbox<model, msg> = {
  init: () => model
  update: (model: model, msg: msg) => model
  view: (model: model) => Html
}

interface Maple {
  init: (root: HTMLElement) => void
}

declare global {
  interface Window {
    Maple: Maple
  }
}

function sandbox<model, msg>(sandbox: Sandbox<model, msg>) {
  window.Maple = {
    init: (root: HTMLElement) => {
      const model = sandbox.init()
      render(root, sandbox.view(model))
    }
  }
}

export { Sandbox, sandbox }

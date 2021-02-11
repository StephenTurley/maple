import { Html } from './html'
import render from './render'
import _ from 'lodash'

type Sandbox<model, msg> = {
  init: () => model
  update: (model: model, msg: msg) => model
  view: (model: model) => Html<msg>
}

interface Maple {
  init: (root: HTMLElement) => void
}

declare global {
  interface Window {
    Maple: Maple
  }
}

function sandbox<model, msg>(s: Sandbox<model, msg>) {
  window.Maple = {
    init: (root: HTMLElement) => {
      const renderModel = (model: model) => {
        render(root, s.view(model), _.partial(updater, model))
      }

      const updater = (model: model, message: msg) => {
        root.innerHTML = ''
        const updated = s.update(model, message)
        renderModel(updated)
      }

      renderModel(s.init())
    }
  }
}

export { Sandbox, sandbox }

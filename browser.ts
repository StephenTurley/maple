import { Html } from './html'
import { Cmd } from './command'
import render from './render'
import _ from 'lodash'

type Sandbox<model, msg> = {
  init: () => model
  view: (model: model) => Html<msg>
  update: (msg: msg, model: model) => model
}

type Sub<msg> = { msg: msg }

type Element<model, msg> = {
  init: (flags: any) => [model, Cmd<msg>]
  view: (model: model) => Html<msg>
  update: (msg: msg, model: model) => [model, Cmd<msg>]
  // subscriptions: (model: model) => Sub<msg>
}

interface Program {
  init: (root: HTMLElement, flags?: any) => void
}

declare global {
  interface Window {
    Maple: Program
  }
}
const renderModel = <model, msg>(
  root: HTMLElement,
  p: Element<model, msg> | Sandbox<model, msg>,
  model: model
) => {
  const renderOnUpdate = (model: model, message: msg) => {
    const updated = p.update(message, model)
    if (updated instanceof Array) {
      renderModel(root, p, updated[0])
    } else {
      renderModel(root, p, updated)
    }
  }

  root.innerHTML = ''
  render(root, p.view(model), _.partial(renderOnUpdate, model))
}

function element<model, msg>(p: Element<model, msg>) {
  window.Maple = {
    init: (root: HTMLElement, flags?: any) => {
      renderModel(root, p, p.init(flags)[0])
    }
  }
}

function sandbox<model, msg>(p: Sandbox<model, msg>) {
  window.Maple = {
    init: (root: HTMLElement) => {
      renderModel(root, p, p.init())
    }
  }
}

export { Sandbox, Element, sandbox, element }

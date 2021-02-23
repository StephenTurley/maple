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

declare global {
  interface Window {
    Willow: {
      init: (root: HTMLElement, flags?: any) => void
    }
  }
}

type Program<model, msg> = Element<model, msg> | Sandbox<model, msg>

function* stateGenerator<model, msg>(
  update: (msg: msg, model: model) => model,
  initial: model
) {
  let current: model = initial

  while (true) {
    yield (current = update(yield, current))
  }
}

const start = <model, msg>(
  root: HTMLElement,
  init: model,
  update: (msg: msg, model: model) => model,
  view: (model: model) => Html<msg>
) => {
  const state = stateGenerator(update, init)

  const onUpdate = (msg: msg) => {
    root.innerHTML = ''
    state.next()
    const model = state.next(msg).value
    if (model !== undefined) {
      render(root, view(model), onUpdate)
    }
  }

  root.innerHTML = ''
  render(root, view(init), onUpdate)
}

function element<model, msg>(p: Element<model, msg>) {
  window.Willow = {
    init: (root: HTMLElement, flags?: any) => {
      const init = p.init(flags)[0]

      const updateModel = (msg: msg, model: model): model => {
        return p.update(msg, model)[0]
      }

      start(root, init, updateModel, p.view)
    }
  }
}

function sandbox<model, msg>(p: Sandbox<model, msg>) {
  window.Willow = {
    init: (root: HTMLElement) => {
      start(root, p.init(), p.update, p.view)
    }
  }
}

export { Sandbox, Element, sandbox, element }

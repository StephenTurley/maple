import { Html } from './html'
import { Cmd, none, processCommand } from './command'
import render from './render'
import * as _ from 'lodash'

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

type StateUpdater<model, msg> = {
  current: model
  next: (msg: msg) => [model, Cmd<msg>]
}
const stateUpdater = <model, msg>(
  update: (msg: msg, model: model) => [model, Cmd<msg>],
  initial: model
): StateUpdater<model, msg> => {
  return {
    current: initial,
    next: function (msg: msg): [model, Cmd<msg>] {
      const [model, cmd] = update(msg, this.current)
      this.current = model
      return [model, cmd]
    }
  }
}

const start = <model, msg>(
  root: HTMLElement,
  init: model,
  update: (msg: msg, model: model) => [model, Cmd<msg>],
  view: (model: model) => Html<msg>
) => {
  const state = stateUpdater(update, init)

  const onUpdate = (msg: msg) => {
    root.innerHTML = ''
    const [model, cmd] = state.next(msg)
    processCommand(cmd, state.next)
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
      start(root, init, p.update, p.view)
    }
  }
}

function sandbox<model, msg>(p: Sandbox<model, msg>) {
  window.Willow = {
    init: (root: HTMLElement) => {
      const update = (msg: msg, model: model): [model, Cmd<msg>] => {
        return [p.update(msg, model), none]
      }
      start(root, p.init(), update, p.view)
    }
  }
}

export { Sandbox, Element, sandbox, element }

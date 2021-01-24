import { Html } from "./html"

interface Sandbox<model, msg> {
  init: () => model
  update: (model, msg) => model
  view: (model) => Html
}

export { Sandbox }

import { Expect } from './expect'

type None = { type: 'none' }
type HttpCommand<msg> = {
  type: 'http'
  method: string
  url: string
  expect: Expect<msg>
}

type Cmd<msg> = None | HttpCommand<msg>

const none: None = { type: 'none' }

const get = <msg, a>(url: string, expect: Expect<msg>): HttpCommand<msg> => ({
  type: 'http',
  method: 'GET',
  url,
  expect
})

export { Cmd, None, HttpCommand, none, get }

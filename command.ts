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

export const processCommand = <msg>(
  cmd: Cmd<msg>,
  callback: (msg: msg) => void
) => {
  switch (cmd.type) {
    case 'none':
      break
    case 'http':
      fetch(cmd.url, {
        method: cmd.method,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          Accept: 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          const result = cmd.expect.decoder.decode(json)
          if (result.isOk()) {
            callback(cmd.expect.toMsg(result.value))
          } else {
            console.error('decoder failed', result)
          }
        })
        .catch((err) => console.error('error', err))
  }
}

export { Cmd, None, HttpCommand, none, get }

import { Expect } from './expect'
import { performHttp, HttpCommand } from './http'

type None = { type: 'none' }

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
): Promise<any> => {
  switch (cmd.type) {
    case 'none':
      return Promise.resolve()
    case 'http':
      return performHttp(cmd, callback)
  }
}

export { Cmd, None, HttpCommand, none, get }

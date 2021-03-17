import { Expect } from './expect'

export type HttpCommand<msg> = {
  type: 'http'
  method: string
  url: string
  expect: Expect<msg>
}

export const performHttp = <msg>(
  cmd: HttpCommand<msg>,
  callback: (c: msg) => void
): Promise<any> => {
  return fetch(cmd.url, {
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
        callback(cmd.expect.toMsg({ type: 'success', value: result.value }))
      } else {
        callback(cmd.expect.toMsg({ type: 'error' }))
      }
    })
    .catch(() => callback(cmd.expect.toMsg({ type: 'error' })))
}

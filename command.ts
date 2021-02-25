type None = { type: 'none' }
type HttpCommand<msg> = { type: 'http'; method: string; url: string; msg: msg }

type Cmd<msg> = None | HttpCommand<msg>

const none: None = { type: 'none' }

const get = <msg>(url: string, msg: msg): HttpCommand<msg> => ({
  type: 'http',
  method: 'GET',
  url,
  msg
})

export { Cmd, None, HttpCommand, none, get }

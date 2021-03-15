export type Event<msg> = {
  name: 'onClick'
  message: msg
}

export const onClick = <msg>(message: msg): Event<msg> => ({
  name: 'onClick',
  message
})

import { Event } from './events'

type Attribute<msg> =
  | {
      name: 'class'
      value: string
    }
  | Event<msg>

const classNames = <msg>(...classNames: string[]): Attribute<msg> => ({
  name: 'class',
  value: classNames.join(' ')
})

export { classNames, Attribute }

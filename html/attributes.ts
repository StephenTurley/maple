type HtmlAttribute<msg> = TextAttribute | MessageAttribute<msg>

type TextAttribute = {
  name: 'class'
  value: string
}

type MessageAttribute<msg> = {
  name: 'onClick'
  message: msg
}

const classNames = (...classNames: string[]): TextAttribute => ({
  name: 'class',
  value: classNames.join(' ')
})

const onClick = <msg>(message: msg): MessageAttribute<msg> => ({
  name: 'onClick',
  message
})

export { classNames, onClick, HtmlAttribute }

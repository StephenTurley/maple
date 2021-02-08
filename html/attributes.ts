type HtmlAttribute = {
  name: string
  value: string
}

export const attr = (name: string, value: string) => ({ name, value })
export const classNames = (...classNames: string[]) => ({
  name: 'class',
  value: classNames.join(' ')
})

export { HtmlAttribute }

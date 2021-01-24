type Html = {
  tag: string
  children: Html[]
  attributes: HtmlAttribute[]
}

type HtmlAttribute = {}

const div = (attrs: HtmlAttribute[], children: Html[]): Html => {
  return {
    tag: 'div',
    children: children,
    attributes: attrs
  }
}
export { Html, div }

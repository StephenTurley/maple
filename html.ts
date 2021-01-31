type Html = Node | TextNode

type Node = {
  type: 'html'
  tag: string
  children: Html[]
  attributes: HtmlAttribute[]
}

type TextNode = {
  type: 'text'
  value: string
}

type HtmlAttribute = {}

const text = (value: string): Html => ({ type: 'text', value: value })
const div = (attrs: HtmlAttribute[], children: Html[]) =>
  node('div', attrs, children)

const p = (attrs: HtmlAttribute[], children: Html[]) =>
  node('p', attrs, children)

const node = (tag: string, attrs: HtmlAttribute[], children: Html[]): Node => {
  return {
    type: 'html',
    tag: tag,
    children: children,
    attributes: attrs
  }
}
export { Html, TextNode, Node, div, p, text }

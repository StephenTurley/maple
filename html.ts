type Html = Node | TextNode

type Node = {
  tag: string
  children: Html[]
  attributes: HtmlAttribute[]
}

type TextNode = {
  tag: 'text'
  value: string
}

type HtmlAttribute = {}

const text = (value: string): Html => ({ tag: 'text', value: value })
const div = (attrs: HtmlAttribute[], children: Html[]) =>
  node('div', attrs, children)

const node = (tag: string, attrs: HtmlAttribute[], children: Html[]): Html => {
  return {
    tag: tag,
    children: children,
    attributes: attrs
  }
}
export { Html, TextNode, Node, div, text }

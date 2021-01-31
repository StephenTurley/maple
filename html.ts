type Html = Node | TextNode

type ElementTag = 'div' | 'p'

type Node = {
  tag: ElementTag
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

const p = (attrs: HtmlAttribute[], children: Html[]) =>
  node('p', attrs, children)

const node = (
  tag: ElementTag,
  attrs: HtmlAttribute[],
  children: Html[]
): Node => {
  return {
    tag: tag,
    children: children,
    attributes: attrs
  }
}
export { Html, TextNode, Node, div, p, text }

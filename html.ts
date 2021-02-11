import { HtmlAttribute } from './html/attributes'
import * as _ from 'lodash'

type Html<msg> = Node<msg> | TextNode

type Node<msg> = {
  type: 'html'
  tag: string
  children: Html<msg>[]
  attributes: HtmlAttribute<msg>[]
}

type TextNode = {
  type: 'text'
  value: string
}

const node = <msg>(
  tag: string,
  attrs: HtmlAttribute<msg>[],
  children: Html<msg>[]
): Node<msg> => {
  return {
    type: 'html',
    tag: tag,
    children: children,
    attributes: attrs
  }
}

type Tag = <msg>(
  attrs: HtmlAttribute<msg>[],
  children: Html<msg>[]
) => Html<msg>

export const button: Tag = _.partial(node, 'button')
export const div: Tag = _.partial(node, 'div')
export const h1: Tag = _.partial(node, 'h1')
export const h2: Tag = _.partial(node, 'h2')
export const h3: Tag = _.partial(node, 'h3')
export const h4: Tag = _.partial(node, 'h4')
export const h5: Tag = _.partial(node, 'h5')
export const h6: Tag = _.partial(node, 'h6')
export const p: Tag = _.partial(node, 'p')
export const span: Tag = _.partial(node, 'span')
export const text = <msg>(value: string): Html<msg> => ({
  type: 'text',
  value: value
})

export { Html, TextNode, Node }

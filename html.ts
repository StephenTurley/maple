import { HtmlAttribute } from './html/attributes'
import * as _ from 'lodash'

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

const node = (tag: string, attrs: HtmlAttribute[], children: Html[]): Node => {
  return {
    type: 'html',
    tag: tag,
    children: children,
    attributes: attrs
  }
}

export const button = _.partial(node, 'button')
export const div = _.partial(node, 'div')
export const p = _.partial(node, 'p')
export const text = (value: string): Html => ({ type: 'text', value: value })

export { Html, TextNode, Node }

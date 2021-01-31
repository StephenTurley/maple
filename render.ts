import { Html, TextNode, Node } from './html'

export default function render(root: HTMLElement, child: Html): HTMLElement {
  if (child.tag === 'text') {
    root.textContent = (child as TextNode).value
    return root
  } else {
    const node = child as Node
    const el = document.createElement(node.tag)
    node.children.forEach((grandChild) => {
      render(el, grandChild)
    })
    return root.appendChild(el)
  }
}

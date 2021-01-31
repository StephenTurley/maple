import { Html, TextNode, Node } from './html'

function renderNode(child: Node): HTMLElement {
  const el = document.createElement(child.tag)
  child.children.forEach((grandChild) => {
    render(el, grandChild)
  })
  return el
}

export default function render(root: HTMLElement, child: Html): HTMLElement {
  if (child.tag === 'text') {
    root.textContent = child.value
    return root
  } else {
    return root.appendChild(renderNode(child))
  }
}

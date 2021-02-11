import { Html, TextNode, Node } from './html'

function renderNode<model, msg>(
  child: Node<msg>,
  emitter: (message: msg) => void
): HTMLElement {
  const el = document.createElement(child.tag)
  child.attributes.forEach((attr) => {
    switch (attr.name) {
      case 'class':
        el.setAttribute(attr.name, attr.value)
        break
      case 'onClick':
        el.addEventListener('click', () => emitter(attr.message))
        break
    }
  })
  child.children.forEach((grandChild) => {
    render(el, grandChild, emitter)
  })
  return el
}

export default function render<model, msg>(
  root: HTMLElement,
  child: Html<msg>,
  emitter: (message: msg) => void
): HTMLElement {
  if (child.type === 'text') {
    root.textContent = child.value
    return root
  } else {
    return root.appendChild(renderNode(child, emitter))
  }
}

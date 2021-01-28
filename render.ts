import { Html } from './html'

export default function render(root: HTMLElement, child: Html): HTMLElement {
  const el = document.createElement(child.tag)
  child.children.forEach((grandChild) => {
    render(el, grandChild)
  })
  return root.appendChild(el)
}

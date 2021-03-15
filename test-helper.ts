import { screen } from '@testing-library/dom'

export const render = (init: (el: HTMLElement) => void) => {
  document.body.innerHTML = `
    <div class="app"></div>
  `
  const el: HTMLElement | null = document.querySelector('.app')

  if (el) {
    init(el)
  } else {
    fail('did not render')
  }

  return screen
}

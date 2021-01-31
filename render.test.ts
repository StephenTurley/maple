import { Html, div, text } from './html'
import render from './render'

describe('render', () => {
  it('renders a child div', () => {
    const given = document.createElement('div')

    const result = render(given, div([], []))

    expect(given.children.length).toEqual(1)
    expect(given.children[0].tagName).toEqual('DIV')
  })

  it('renders all the children', () => {
    const given = document.createElement('div')
    const html = div([], [div([], []), div([], []), div([], [])])

    const result = render(given, html)

    expect(given.children[0].children.length).toEqual(3)
  })

  it('renders text', () => {
    const given = document.createElement('div')
    const html = div([], [text('flerpn')])

    const result = render(given, html)

    expect(given.children[0].textContent).toEqual('flerpn')
  })
})

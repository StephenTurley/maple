import './counter'
import { screen, fireEvent } from '@testing-library/dom'

describe('counter', () =>{
  beforeEach(() =>{
    document.body.innerHTML = `
      <div class="counter"></div>
    `
    const el: HTMLElement | null = document.querySelector('.counter')

    if(el) {
      window.Willow.init(el)
    }else {
      fail('did not render')
    }
  })

  it('should have a heading', () => {
    screen.getByRole('heading')
  })

  it('should initialize with a count of 0', () => {
    screen.getByText('0')
  })

  it('should increment',() => {
    const increment = screen.getByRole('button', { name: 'Increment' })

    fireEvent.click(increment)

    screen.getByText('1')
  })

  it('should decrement',() => {
    const decrement = screen.getByRole('button', { name: 'Decrement' })

    fireEvent.click(decrement)

    screen.getByText('-1')
  })

  it('increment and decrement over 0',() => {
    const decrement = screen.getByRole('button', { name: 'Decrement' })
    const increment = screen.getByRole('button', { name: 'Increment' })

    fireEvent.click(decrement)
    fireEvent.click(increment)
    fireEvent.click(increment)

    screen.getByText('1')
  })
})

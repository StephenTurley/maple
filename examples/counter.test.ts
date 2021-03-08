import './counter'
import { screen, fireEvent } from '@testing-library/dom'
import { render } from '../test-helper'

describe('counter', () => {
  beforeEach(() => render(window.Willow.init))

  it('should have a heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Count stuff with Willow!'
    )
  })

  it('should initialize with a count of 0', () => {
    screen.getByText('0')
  })

  it('should increment', () => {
    const increment = screen.getByRole('button', { name: 'Increment' })

    fireEvent.click(increment)

    screen.getByText('1')
  })

  it('should decrement', () => {
    const decrement = screen.getByRole('button', { name: 'Decrement' })

    fireEvent.click(decrement)

    screen.getByText('-1')
  })

  it('increment and decrement over 0', () => {
    const decrement = screen.getByRole('button', { name: 'Decrement' })
    const increment = screen.getByRole('button', { name: 'Increment' })

    fireEvent.click(decrement)
    fireEvent.click(increment)
    fireEvent.click(increment)

    screen.getByText('1')
  })
})

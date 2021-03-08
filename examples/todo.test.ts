import './todo'
import { screen } from '@testing-library/dom'
import { render } from '../test-helper'

describe('todos', () => {
  beforeEach(() => render(window.Willow.init))

  it('should have a heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Todos!')
  })
})

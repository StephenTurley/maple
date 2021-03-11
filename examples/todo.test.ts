import TodoApp, { Todo, todosDecoder } from './todo'
import { screen, waitFor } from '@testing-library/dom'
import { render } from '../test-helper'
import { rest } from 'msw'
import { Result, Ok } from 'ts.data.json'
import { map, omit } from 'lodash/fp'

describe('todos', () => {
  beforeEach(() => {
    rest.get('http://localhost:8888/todos', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, title: 'The first thing', complete: false },
          { id: 2, title: 'The second thing', complete: false }
        ])
      )
    })
    // TODO pass app to render function
    TodoApp
    render(window.Willow.init)
  })

  it('should have a heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Todos!')
  })

  xit('should fetch the todos', async () => {
    await waitFor(() => screen.getByText('The first thing'))
    await waitFor(() => screen.getByText('The second thing'))
  })

  describe('todosDecoder', () => {
    const expected = [{ id: 1, title: 'flerpn', complete: false }]

    it('should decode some json', async () => {
      const result: Todo[] = await todosDecoder.decodePromise(expected)
      expect(result).toEqual(expected)
    })

    it('requires an id', async () => {
      const result: Result<Todo[]> = todosDecoder.decode(
        map(omit('id'), expected)
      )
      if (result.isOk()) {
        fail('did not return an error')
      } else {
        expect(result.error).toMatch(/decoder failed at key \"id\"/)
      }
    })

    it('requires an title', async () => {
      const result: Result<Todo[]> = todosDecoder.decode(
        map(omit('title'), expected)
      )
      if (result.isOk()) {
        fail('did not return an error')
      } else {
        expect(result.error).toMatch(/decoder failed at key \"title\"/)
      }
    })

    it('requires a complete', async () => {
      const result: Result<Todo[]> = todosDecoder.decode(
        map(omit('complete'), expected)
      )
      if (result.isOk()) {
        fail('did not return an error')
      } else {
        expect(result.error).toMatch(/decoder failed at key \"complete\"/)
      }
    })
  })
})

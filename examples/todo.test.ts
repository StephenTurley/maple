import TodoApp, { Todo, todosDecoder } from './todo'
import { waitFor } from '@testing-library/dom'
import { render } from '../test-helper'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Result, Ok } from 'ts.data.json'
import { map, omit } from 'lodash/fp'

describe('todos', () => {
  const server = setupServer(
    rest.get('/api/todos', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1, title: 'The first thing', complete: false },
          { id: 2, title: 'The second thing', complete: false }
        ])
      )
    })
  )
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  const subject = () => {
    // TODO pass app to render function
    TodoApp
    return render(window.Willow.init)
  }

  describe('happy path', () => {
    it('should initialize', () => {
      const { getByRole, getByText } = subject()
      getByText('loading...')
      expect(getByRole('heading')).toHaveTextContent('Todos!')
    })

    it('should fetch the todos', async () => {
      const { getByText } = subject()
      await waitFor(() => getByText('The first thing'))
      await waitFor(() => getByText('The second thing'))
    })
  })

  describe('errors', () => {
    it('let the user know when something goes wrong', async () => {
      server.use(
        rest.get('/api/todos', (req, res, ctx) => {
          return res(ctx.status(400))
        })
      )

      const { getByText } = subject()

      await waitFor(() => getByText('Error occurred'))
    })
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

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { JsonDecoder } from 'ts.data.json'
import { get, processCommand } from './command'
import { expectJson, Result } from './expect'
import { waitFor } from '@testing-library/dom'

describe('command', () => {
  describe('processCommand', () => {
    const server = setupServer(
      rest.get('/foo', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ foo: 'bar' }))
      }),
      rest.get('/bad_request', (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    beforeAll(() => server.listen())
    afterAll(() => server.close())

    const msg = (result: Result<{ foo: string }>) => ({
      type: 'got foo',
      result: result
    })
    const decoder = JsonDecoder.object({ foo: JsonDecoder.string }, 'foo')
    const callback = jest.fn()

    it('should return a success', async () => {
      const cmd = get('/foo', expectJson(msg, decoder))

      await processCommand(cmd, callback)

      expect(callback).toHaveBeenCalledWith({
        type: 'got foo',
        result: { type: 'success', value: { foo: 'bar' } }
      })
    })

    it('should return error on bad_request', async () => {
      const cmd = get('/bad_request', expectJson(msg, decoder))

      await processCommand(cmd, callback)

      expect(callback).toHaveBeenCalledWith({
        type: 'got foo',
        result: { type: 'error' }
      })
    })
  })
})

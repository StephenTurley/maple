import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { JsonDecoder } from 'ts.data.json'
import { get, processCommand } from './command'
import { expectJson } from './expect'
import { waitFor } from '@testing-library/dom'

describe('command', () => {
  describe('processCommand', () => {
    const server = setupServer(
      rest.get('/foo', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ foo: 'bar' }))
      })
    )
    beforeAll(() => server.listen())
    afterAll(() => server.close())

    it('should get foo', async () => {
      const msg = (arg: { foo: string }) => ({
        type: 'got foo',
        value: arg.foo
      })
      const decoder = JsonDecoder.object(
        { foo: JsonDecoder.string },
        'foo-decoder'
      )
      const cmd = get('/foo', expectJson(msg, decoder))
      const callback = jest.fn()

      await processCommand(cmd, callback)

      expect(callback).toHaveBeenCalledWith({ type: 'got foo', value: 'bar' })
    })
  })
})

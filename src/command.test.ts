import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { JsonDecoder } from 'ts.data.json'
import { get, put, processCommand } from './command'
import { expectJson, Result } from './expect'
import { waitFor } from '@testing-library/dom'
import * as _ from 'lodash'

describe('command', () => {
  describe('processCommand', () => {
    const server = setupServer(
      rest.get('/foo', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ foo: 'bar' }))
      }),
      rest.put('/foo', (req, res, ctx) => {
        if (_.isEqual(req.body, { foo: 'bar' })) {
          return res(ctx.status(200), ctx.json({ foo: 'bar' }))
        } else {
          return res(ctx.status(400))
        }
      }),
      rest.get('/bad_request', (req, res, ctx) => {
        return res(ctx.status(400))
      }),
      rest.get('/malformed_response', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ flerpn: 'bar' }))
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

    describe('GET', () => {
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

      it('should return error decoder fails', async () => {
        const cmd = get('/malformed_response', expectJson(msg, decoder))

        await processCommand(cmd, callback)

        expect(callback).toHaveBeenCalledWith({
          type: 'got foo',
          result: { type: 'error' }
        })
      })
    })

    describe('PUT', () => {
      it('should return a success', async () => {
        const cmd = put('/foo', { foo: 'bar' }, expectJson(msg, decoder))

        await processCommand(cmd, callback)

        expect(callback).toHaveBeenCalledWith({
          type: 'got foo',
          result: { type: 'success', value: { foo: 'bar' } }
        })
      })
    })
  })
})

import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { createContext, createRequest, testMidiffy } from '../../utils/testUtils'
import { HttpException } from '../../exceptions'
import { handleUnknowErrors } from '../handleUnknowErrors'

describe('middlewares - handleUnknowErrors', () => {
  const context = createContext()

  it('should return internal server errir if unknow error', async () => {
    const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
      throw new Error('error')
    }
    const main = testMidiffy(handler, handleUnknowErrors())
    const request = createRequest()
    expect(await main(request, context)).toStrictEqual({
      statusCode: 500,
      body: '{"message":"Oops something went wrong. Please try again later."}',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('should return the error message if HttpError', async () => {
    const message = 'Im a teapot'
    const statusCode = 418
    const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
      throw new HttpException(message, statusCode)
    }
    const main = testMidiffy(handler, handleUnknowErrors())
    const request = createRequest()
    expect(await main(request, context)).toStrictEqual({
      statusCode,
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})

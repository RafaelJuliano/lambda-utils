import * as yup from 'yup'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { createContext, createRequest, testMidiffy } from '../../utils/testUtils'

import { BadRequestException } from '../../exceptions/BadRequestException'
import { validateQueryStringParameters } from '../validateQueryStringParameters'

describe('middlewares - validateQueryStringParameters', () => {
  const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
    return Promise.resolve()
  }

  const context = createContext()

  const schema = yup.object({
    key: yup.string().required(),
  })

  const main = testMidiffy(handler, validateQueryStringParameters(schema))

  const validate = async (event: APIGatewayProxyEventV2, errors?: unknown) => {
    try {
      await main(event, context)
      return true
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.statusCode).toBe(400)
      expect(error.body).toStrictEqual({
        message: 'Bad Request.',
        errors,
      })
    }
  }

  it('should validate query string parameters', async () => {
    const request = createRequest({
      queryStringParameters: {
        key: 'value',
      },
    })
    expect(await validate(request)).toBeTruthy()
  })

  it('should validate an invalid parameters', async () => {
    const request = createRequest({
      queryStringParameters: {},
    })
    //@ts-ignore
    delete request.headers
    await validate(request, ['key is a required field'])
  })

  it('should validate undefined parameters', async () => {
    const request = createRequest({})
    await validate(request, ['key is a required field'])
  })
})

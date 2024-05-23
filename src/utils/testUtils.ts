import middy from '@middy/core'
import type { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import type { Middleware } from '../middify'

export const testMidiffy = (
  handler: (event: APIGatewayProxyEventV2) => Promise<unknown>,
  middleware: Middleware,
) => {
  return middy(handler).use(middleware)
}

export const createRequest = (event?: {
  headers?: APIGatewayProxyEventV2['headers']
  body?: APIGatewayProxyEventV2['body']
  queryStringParameters?: APIGatewayProxyEventV2['queryStringParameters']
  pathParameters?: APIGatewayProxyEventV2['pathParameters']
}): APIGatewayProxyEventV2 => {
  return {
    version: '',
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    headers: {},
    requestContext: {
      accountId: '',
      apiId: '',
      domainName: '',
      domainPrefix: '',
      http: {
        method: '',
        path: '',
        protocol: '',
        sourceIp: '',
        userAgent: '',
      },
      requestId: '',
      routeKey: '',
      stage: '',
      time: '',
      timeEpoch: 0,
    },
    isBase64Encoded: false,
    ...event,
  }
}

export const createContext = (): Context => {
  return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 1,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  }
}

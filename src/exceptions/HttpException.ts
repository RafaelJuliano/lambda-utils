export class HttpException extends Error {
  readonly statusCode: number

  readonly body: object | string | number

  constructor(message: string, statusCode: number, body: object | string | number = {}) {
    super(message)
    this.statusCode = statusCode
    this.body =
      typeof body === 'object' && body !== null
        ? {
            message,
            ...body,
          }
        : body
  }
}

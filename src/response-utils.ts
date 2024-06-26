const ok = () => {
  return {
    statusCode: 202,
  }
}

const success = (body: object, contentType?: string) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      'content-type': contentType || 'application/json',
    },
  }
}

const created = (body: object, contentType?: string) => {
  return {
    statusCode: 201,
    body: JSON.stringify(body),
    headers: {
      'content-type': contentType || 'application/json',
    },
  }
}

const noContent = () => {
  return {
    statusCode: 204,
  }
}

export const Response = {
  ok,
  created,
  success,
  noContent,
}

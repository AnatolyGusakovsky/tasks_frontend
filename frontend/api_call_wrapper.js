export class Api_call_wrapper {
  async make_call(
    url,
    method,
    body,
    token
  ) {
    return await fetch(url, {
      method: method,
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: body !== undefined ? JSON.stringify(body) : null
    })
  }
}

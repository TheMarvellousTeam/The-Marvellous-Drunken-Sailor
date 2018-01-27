import { stringify } from 'querystring'

const safeJSONparse = s => {
  try {
    return JSON.parse(s)
  } catch (err) {
    return null
  }
}

export default (url, { query = {}, method = 'GET', body } = {}) =>
  fetch(`${url}?${stringify(query)}`, {
    method: method || 'GET',
    body: (body && JSON.stringify(body)) || null,
    headers: {
      'content-type': (body && 'application/json') || null,
    },
  })
    .then(async res => {
      const text = await res.text()

      if (!res.ok) throw Error(`${res.status} - ${text}`)

      return safeJSONparse(text) || text
    })
    .catch(err => {
      error(err)
      throw err
    })

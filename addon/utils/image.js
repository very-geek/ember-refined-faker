const HOST_MAP = {
  unsplash: 'unsplash.it'
}

export function buildQueryParams(blur, random, gravity) {
  let params = []

  if (blur) params.push('blur')
  if (random) params.push('random')
  if (gravity) params.push(`gravity=${gravity}`)

  return params.length ? params.join('&') : false
}

export default function generateImageURL([
  namespace, // eslint-disable-line
  method,
  w = 400,
  h = 300,
], {
  blur = false,
  random = false,
  gravity = false,
  grayscale = false
}) {
  const host = HOST_MAP[method]
  const base = `//${host}/${grayscale ? 'g/' : ''}${w}/${h}`
  const params = buildQueryParams(blur, random, gravity)
  return `https:${base}${params ? '?' + params : ''}`
}

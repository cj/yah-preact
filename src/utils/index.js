import deepmerge from 'deepmerge'

export function preventDefault(callback) {
  return (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (callback) callback.call(this, event)
  }
}

export function uuid() {
  // eslint-disable-next-line global-require
  return process.env.CLIENT ? require('cuid')() : ''
}

export const childrenProp = (prop, callback) => {
  if (!prop) return prop

  const children = Array.isArray(prop) ? prop : [prop]

  return children.map(child => (callback ? callback(child) : child))
}

export const humanize = text => text.toString().toLowerCase()
  .replace(/[_-]/g, ' ')
  .replace(/(?:^|\s)\S/g, replaceString => replaceString.toUpperCase())

export function throttle(func, wait = 100) {
  let timer = null

  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, wait)
    }
  }
}

export { deepmerge }

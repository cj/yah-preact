/* eslint-disable no-return-assign, max-len */

// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Internet Explorer 6-11
// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || (typeof document !== 'undefined' && !!document.documentMode)

const load = async (callback = () => {}) => {
  if (process.env.SSR) {
    return callback()
  }

  const imports = []

  if (isIE) {
    // https://github.com/WebReflection/dom4
    imports.push(import(/* webpackChunkName: "ie-polyfills" */ 'dom4'))
  }

  if (!Object.entries) imports.push(import(/* webpackChunkName: "ie-polyfills" */'./entries'))
  if (!Object.keys) imports.push(import(/* webpackChunkName: "ie-polyfills" */'./keys'))
  if (!Array.prototype.filter) imports.push(import(/* webpackChunkName: "ie-polyfills" */'./filter'))
  if (!Array.prototype.find) imports.push(import(/* webpackChunkName: "ie-polyfills" */'./find'))
  if (!Array.prototype.includes || !String.prototype.includes) imports.push(import(/* webpackChunkName: "ie-polyfills" */'./includes'))
  if (!Array.from) Array.from = object => [].slice.call(object)
  if (!Array.isArray) Array.isArray = arg => Object.prototype.toString.call(arg) === '[object Array]'
  if (!Object.values) Object.values = object => Object.keys(object).map(key => object[key])

  if (imports.length) {
    await Promise.all(imports)
  }

  return callback && callback()
}

export default load

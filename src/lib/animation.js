const animationEnd = (function getAnmiation(el) {
  if (!el) return

  const animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  }

  let animation

  Object.keys(animations).forEach((key) => {
    if (el.style[key] !== undefined) {
      animation = animations[key]
    }
  })

  // eslint-disable-next-line consistent-return
  return animation
}(typeof document !== 'undefined' && document.createElement('div')))

const oneTimeEvent = async (element, eventType, callback) => {
  const response = await new Promise((resolve) => {
    const eventFunction = (event) => {
      element.removeEventListener(eventType, eventFunction)
      resolve(event)
    }

    element.addEventListener(eventType, eventFunction)
  })

  if (callback) callback(response)

  return response
}

export default (element, callback) => element && oneTimeEvent(element, animationEnd, callback)

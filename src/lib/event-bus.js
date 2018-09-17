/* eslint-disable no-underscore-dangle */
import { h, Component } from 'preact'
import mitt from 'mitt'

const eventBus = mitt()

export function connect(events) {
  return (Child) => {
    function EventBusConnectWrapper(props) {
      this.componentDidMount = () => {
        Object.entries(events).forEach(([name, callback]) => {
          eventBus.on(name, this._component[callback])
        })
      }

      // forward the ref to the component
      this.__forwardRef = () => {
        const { __r } = this
        this.__r = () => __r && __r(this._component)
      }

      this.componentWillMount = () => this.__forwardRef()
      this.componentWillUpdate = () => this.__forwardRef()

      this.componentWillUnmount = () => {
        Object.entries(events).forEach(([name, callback]) => {
          eventBus.off(name, this._component[callback])
        })
      }

      this.render = () => h(Child, { emit: eventBus.emit, ...props })
    }

    // eslint-disable-next-line no-return-assign
    return (EventBusConnectWrapper.prototype = new Component()).constructor = EventBusConnectWrapper
  }
}

export default eventBus

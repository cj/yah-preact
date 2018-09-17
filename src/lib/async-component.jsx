// https://medium.com/front-end-hacking/loading-components-asynchronously-in-react-app-with-an-hoc-61ca27c4fda7
import { h, Component } from 'preact'

let nprogress

if (process.env.CLIENT) {
  // eslint-disable-next-line global-require
  nprogress = require('~/lib/nprogress').default
}

const asyncComponent = importComponent => class extends Component {
  state = {
    component: null,
  }

  // We want to starting loading the actual component asap.
  componentWillMount() {
    if (nprogress) nprogress.start()

    importComponent()
      .then((cmp) => {
        this.setState({ component: cmp.default })
        if (nprogress) nprogress.done()
      })
  }

  render({ loading, ...props }, { component }) {
    const C = component
    return C ? <C {...props} /> : loading
  }
}

export default asyncComponent

import { h, Component } from 'preact'
import { ApolloProvider } from 'react-apollo'
import ReactBreakpoints from 'react-breakpoints'

import polyfills from '~/polyfills'
import Router from './Router'
import client, { loadCache } from '~/graphql/client'
import asyncComponent from '~/lib/async-component'

const Notifications = asyncComponent(() => import('~/components/Notifications'))

const breakpoints = {
  mobile: 768,
  tablet: 769,
  desktop: 1024,
  desktopWide: 1216,
}

export default class App extends Component {
  state = {
    loading: true,
  }

  constructor(props) {
    super(props)

    Promise.all([loadCache(), polyfills()]).then(() => {
      this.setState({ loading: false })
    })
  }

  render(_props, { loading }) {
    return (
      <div id="app" class="App">
        {!loading && (
          <ApolloProvider client={client}>
            <ReactBreakpoints breakpoints={breakpoints} debounceResize>
              <div class="App__container">
                <Notifications />
                <Router />
              </div>
            </ReactBreakpoints>
          </ApolloProvider>
        )}
      </div>
    )
  }
}

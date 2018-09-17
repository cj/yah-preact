import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import client from '~/graphql/client'
import asyncComponent from '~/lib/async-component'
import USER_QUERY from '~/graphql/queries/user.gql'

const Home = asyncComponent(() => import('~/routes/Home'))
const Profile = asyncComponent(() => import('~/routes/Profile'))

export default class App extends Component {
  /** Gets fired when the route changes.
   *  @param {Object} event "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url The newly routed URL
   */
  handleRoute = ({ current: { attributes: { isPrivate } } }) => {
    if (!process.env.SSR && isPrivate) {
      const { user } = client.readQuery({ query: USER_QUERY })

      if (!user.loggedIn) route('/login')
    }
  };

  render() {
    return (
      <Router onChange={this.handleRoute}>
        <Home path="/" />
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
      </Router>
    )
  }
}

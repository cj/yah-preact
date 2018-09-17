/* eslint-disable no-use-before-define */
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import { deepmerge } from '~/utils'

import ADD_NOTIFICATION_MUTATION from '~/graphql/mutations/add-notification.gql'
import LOGOUT_MUTATION from '~/graphql/mutations/logout.gql'
import TOKEN_QUERY from '~/graphql/queries/token.gql'

let cacheLoaded = false

const cache = new InMemoryCache()

export const persistCache = new CachePersistor({ cache, storage: require('localforage') })

export const loadCache = () => {
  if (process.env.CLIENT && !cacheLoaded) {
    cacheLoaded = true

    return persistCache.restore()
  }

  return true
}

const handleNetworkError = (error) => {
  if (error.message.match(/Cannot read property/)) {
    return process.env.NODE_ENV === 'development' && console.error(error)
  }

  return client.mutate({
    mutation: ADD_NOTIFICATION_MUTATION,
    variables: {
      type: 'error',
      message: 'Server is currently offline, please try again later.',
    },
  })
}

const handleGraphqlErrors = (errors) => {
  errors.forEach((error) => {
    if (error.code === 401) {
      client.mutate({
        mutation: LOGOUT_MUTATION,
        variables: { message: 'Sorry you have been logged out, please log back in.' },
      })
    } else if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  })
}

const onError = ({ networkError, graphQLErrors }) => {
  if (networkError) handleNetworkError(networkError)
  if (graphQLErrors) handleGraphqlErrors(graphQLErrors)
}

export const clientState = deepmerge.all([
  require('~/graphql/resolvers/user'),
  require('~/graphql/resolvers/notification'),
  require('~/graphql/resolvers/actions'),
  require('~/graphql/resolvers/token'),
])

const request = async ({ setContext, operationName }) => {
  if (!['Login', 'SignupWithInvite'].includes(operationName)) {
    const { token } = client.readQuery({ query: TOKEN_QUERY })

    if (token) setContext({ headers: { Authorization: `Bearer ${token.jwt}` } })
  }
}

// TODO: We will want to dynamically load resolvers and default state to save on
// initial page load.  This is going to be added soon™:
// https://github.com/apollographql/apollo-link-state/issues/175

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache,
  onError,
  clientState,
  request,
})

export default client

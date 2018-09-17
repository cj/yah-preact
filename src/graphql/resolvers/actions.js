import client, { clientState } from '~/graphql/client'
import { route } from 'preact-router'

import ADD_NOTIFICATION_MUTATION from '~/graphql/mutations/add-notification.gql'

export const defaults = {}

export const resolvers = {
  Mutation: {
    logout: (_, { message }, { cache }) => {
      cache.writeData({ data: clientState.defaults })

      if (message) {
        client.mutate({
          mutation: ADD_NOTIFICATION_MUTATION,
          variables: {
            type: 'error',
            message,
          },
        })
      }

      route('/login')

      return null
    },
  },
}

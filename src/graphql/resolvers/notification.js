import { uuid } from '~/utils'

import NOTIFICATIONS_QUERY from '~/graphql/queries/notifications.gql'

export const defaults = {
  notifications: [],
}

export const resolvers = {
  Mutation: {
    addNotification: (_, { type, message }, { cache }) => {
      const query = NOTIFICATIONS_QUERY
      const previous = cache.readQuery({ query })
      const newNotification = {
        id: uuid(),
        type,
        message,
        __typename: 'Notification',
      }
      const data = {
        notifications: previous.notifications.concat([newNotification]),
      }

      cache.writeQuery({ query, data })

      return newNotification
    },

    removeNotification: (_, { id }, { cache }) => {
      const query = NOTIFICATIONS_QUERY
      const { notifications } = cache.readQuery({ query })

      const data = {
        notifications: notifications.filter(
          notification => notification.id !== id,
        ),
      }

      cache.writeQuery({ query, data })

      return null
    },
  },
}

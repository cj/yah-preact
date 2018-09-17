import './style'
import { h } from 'preact'
import Notification from './Notification'
import { Query } from 'react-apollo'

import NOTIFICATIONS_QUERY from '~/graphql/queries/notifications.gql'

// TODO: Need to grab notifications as they come in one by one, then remove them
// from the store

const Notifications = () => (
  <Query query={NOTIFICATIONS_QUERY}>
    {({ data: { notifications } }) => (
      <div class="Notifications">
        {notifications.map(notification => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    )}
  </Query>
)

export default Notifications

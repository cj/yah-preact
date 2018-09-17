import { h, Component } from 'preact'
import animation from '~/lib/animation'
import client from '~/graphql/client'

import REMOVE_NOTIFICATION_MUTATION from '~/graphql/mutations/remove-notification.gql'

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.setTypeClass(props.type)
  }

  state = {
    typeClass: '',
    animationClass: 'fadeIn',
  }

  removeNotification = (id) => {
    client.mutate({
      mutation: REMOVE_NOTIFICATION_MUTATION,
      variables: { id },
    })
  }

  componentDidMount = async () => {
    const { id } = this.props

    await animation(this.notification)

    this.setState({ animationClass: 'delay-3s fadeOut' })

    await animation(this.notification)

    this.removeNotification(id)

    this.base.remove()
  }

  setTypeClass = (type) => {
    let typeClass

    switch (type) {
      case 'error':
        typeClass = 'is-danger'
        break
      default:
        typeClass = 'is-info'
        break
    }

    this.setState({ typeClass })
  }

  render({ id, message }, { typeClass, animationClass }) {
    return (
      <div
        ref={ref => this.notification = ref}
        class={`notification ${typeClass} animated ${animationClass}`}
      >
        <button onClick={() => this.removeNotification(id)} type="button" class="delete" />
        {message}
      </div>
    )
  }
}

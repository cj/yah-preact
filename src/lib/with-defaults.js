import client from '~/graphql/client'
import { uuid } from '~/utils'
import USER_QUERY from '~/graphql/queries/user.gql'

const withdefaults = (__typename, record) => {
  const { user } = client.readQuery({ query: USER_QUERY })
  const unixDateTime = new Date().getTime()
  const id = uuid()

  return Object.assign({
    __typename,
    id,
    createdAt: unixDateTime,
    createdById: user.id,
    updatedAt: unixDateTime,
    updatedById: user.id,
    permission: {
      __typename: 'Permission',
      create: true,
      update: true,
      destroy: true,
    },
  }, record)
}

export default withdefaults

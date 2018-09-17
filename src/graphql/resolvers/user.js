import USER_FIELDS from '~/graphql/fragments/user-fields.gql'

export const defaults = {
  user: {
    __typename: 'User',
    id: null,
    displayName: null,
    email: null,
    emailVerified: null,
    loggedIn: false,
  },
}

export const resolvers = {
  User: {
    loggedIn: ({ id }) => !!id,
  },

  Query: {
    user(_, _variables, { cache }) {
      return cache.readFragment({ fragment: USER_FIELDS })
    },
  },
}

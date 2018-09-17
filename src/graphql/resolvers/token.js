import TOKEN_FIELDS from '~/graphql/fragments/user-fields.gql'

export const defaults = {
  token: {
    __typename: 'Token',
    jwt: null,
    expiresAt: null,
  },
}

export const resolvers = {
  Query: {
    token(_, _variables, { cache }) {
      return cache.readFragment({ fragment: TOKEN_FIELDS })
    },
  },
}

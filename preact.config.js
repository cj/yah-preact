import {
  defaults,
  sassResources,
  dotenv,
  purgecss,
  compression,
  graphql,
} from './plugins'

export default function (config, env, helpers) {
  defaults({ config })

  sassResources({ config, helpers })

  dotenv({ config, helpers }, {
    variables: {
      SSR: env.ssr,
      CLIENT: !env.ssr,
    },
  })

  purgecss({ config })

  compression({ config })

  graphql({ config })
}

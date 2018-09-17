import { join } from 'path'

export default ({ config, helpers }, { resources } = {}) => {
  let sassResources = resources || ['style/shared/resources.scss']

  const { rule: sassRule } = helpers.getLoadersByName(config, 'proxy-loader')[1]

  if (!Array.isArray(sassResources)) {
    sassResources = [sassResources]
  }

  sassRule.use.push({
    loader: 'sass-resources-loader',
    options: {
      // Provide path to the file with resources
      resources: sassResources.map(resource => join(config.context, resource)),
    },
  })
}

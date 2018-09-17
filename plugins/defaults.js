export default function ({ config }) {
  config.output.globalObject = 'self'

  config.resolve.alias['~'] = config.context

  config.performance = {
    maxEntrypointSize: 100000, // 100kb
    maxAssetSize: 100000, // 100kb
    assetFilter: assetFilename => assetFilename.endsWith('.js.gz'),
  }

  // https://github.com/graphql/graphql-js/issues/1272#issuecomment-393903706
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  })

  config.resolve.extensions.push('.mjs')
}

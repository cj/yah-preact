/* eslint-disable import/no-extraneous-dependencies */

export default function ({ config, helpers }, { types }) {
  const { rule: babelRule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  const babelConfig = babelRule.options

  const fontawesomeFonts = [
    'fontawesome-pro-solid',
  ].concat(types.map(font => `${font}-svg-icons`))

  babelConfig.plugins.push([
    'transform-imports',
    fontawesomeFonts.reduce((fonts, font) => ({
      ...fonts,
      [`@fortawesome/${font}`]: {
        transform: `@fortawesome/${font}/\${member}`,
        skipDefaultConversion: true,
      },
    }), {}),
  ])
}

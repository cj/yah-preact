// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config()

export default ({ config, helpers }, { variables } = {}) => {
  const { definitions } = helpers.getPluginsByName(config, 'DefinePlugin')[0].plugin
  const processVariables = Object.entries(variables).reduce((processedVariables, [key, value]) => ({
    ...processedVariables,
    [key]: JSON.stringify(value),
  }), {})

  // add a PRERENDER global:
  definitions.process = {
    env: processVariables,
  }
}

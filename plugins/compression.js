/* eslint-disable import/no-extraneous-dependencies */
import CompressionPlugin from 'compression-webpack-plugin'

export default function ({ config }) {
  config.plugins.push(new CompressionPlugin())
}

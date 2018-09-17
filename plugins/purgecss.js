/* eslint-disable import/no-extraneous-dependencies */
import glob from 'glob'
import PurgecssPlugin from 'purgecss-webpack-plugin'

class CustomExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9_-]+/g) || []
  }
}

export default function ({ config }) {
  config.plugins.push(
    new PurgecssPlugin({
      paths: () => glob.sync(`${config.context}/**/!(*.test)*.jsx`, { nodir: true }),
      whitelist: () => ['app', 'html', 'body', 'fa', 'svg', 'animated'],
      whitelistPatterns: () => [
        /[A-Za-z0-9_-]+__[A-Za-z0-9_-]+/,
        /^fa-.*/,
        /^svg-.*/,
        /^animated.*/,
        /^slide.*/,
      ],
      extractors: [
        {
          extractor: CustomExtractor,
          extensions: ['jsx', 'js'],
        },
      ],
    }),
  )
}

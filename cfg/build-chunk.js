const buildConfig = require('./build')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const optimization = {
    minimizer: [
        new UglifyJsPlugin({
            parallel: true,
        }),
    ],
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        name: false,
        cacheGroups: {
            statics: {
                name: 'statics',
                chunks: 'initial',
                priority: 100,
                reuseExistingChunk: false,
                enforce: true,
                test: m => /\/node_modules\/(react|redux|acorn)/.test(m.context),
                // test: m => /\/node_modules\/(react|redux|classnames|prop-types|acorn)/.test(m.context),
            },
            antd: {
                name: 'antd',
                chunks: 'initial',
                priority: 90,
                reuseExistingChunk: true,
                enforce: true,
                test: m => /\/node_modules\/(antd|@ant-design)/.test(m.context),
            },
        }
    },
}

const config = {
    ...buildConfig,
    optimization,
}

module.exports = config

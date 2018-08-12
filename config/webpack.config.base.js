const path = require('path');

module.exports = {
	target: 'web',
	entry: {
		main: path.join(__dirname, '../src/index.js'),
		vendor: [
			'react',
			'react-dom'
		]
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: {
					chunks: 'all',
					name: 'vendor',
					test: /node_modules/,
					priority: 20
				},
				common: {
					name: 'common',
					chunks: 'all',
					minChunks: 2,
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	},
	resolve: {
		modules: ['node_modules', path.resolve('../src')],
		extensions: ['.js', '.jsx', '.scss', '.json'],
		alias: {
			actions: path.resolve(__dirname, '../src/actions'),
			asset: path.resolve(__dirname, '../src/assets'),
			components: path.resolve(__dirname, '../src/components'),
			containers: path.resolve(__dirname, '../src/containers'),
			reducers: path.resolve(__dirname, '../src/reducers')
		}
	}
};
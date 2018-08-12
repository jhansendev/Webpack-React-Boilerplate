const path = require('path');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.config.base');

module.exports = merge (base, { 
	mode: 'development',
	devtool: 'cheap-module-source-map',
	cache: true,
	devServer: {
		historyApiFallback: true,
		contentBase: 'dist',
		hot: true,
		open: true,
		watchOptions: {
			ignored: /node_modules/
		},
		compress: true
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].js',
		chunkFilename: 'static/js/[name].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: { loader: 'html-loader'}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.svg$/,
				use: 'svg-inline-loader'
			},
			{
				test: /\.(png|jpg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'image/[name]-[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/index.html'),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].css'
		})
	]
});
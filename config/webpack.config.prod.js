const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack');
const base = require('./webpack.config.base');

module.exports = merge (base, {
	mode: 'production',
	cache: false,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/[name].[hash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{ loader: 'html-loader', options: { minimize: true } }]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							compact: true
						}
					},
					{
						loader: 'eslint-loader'
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: '[name].[hash:8].[ext]',
							outputPath: 'static/media'
						}
					},
					{
						loader: 'image-webpack-loader',
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(scss|css)$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(path.join(__dirname, 'dist')),
		new webpack.HashedModuleIdsPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/index.html'),
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyCSS: true,
				minifyJS: true,
				minifySCSS: true,
				minifyURLs: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[hash].css',
			chunkFilename: 'static/css/[name].[hash].css'
		}),
		new PurifyCssPlugin({
			paths: glob.sync(path.join(__dirname, '../src/**/*{.js, .html}')),
			purifyOptions: { minify: true }
		})
	]
});
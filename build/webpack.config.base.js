require('./enforceDevEngines');
const { resolve } = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('eslint-formatter-friendly');
const cacheLoader = require('./cacheLoader');
const pkg = require('../package.json');
const isProd = (process.env.NODE_ENV === 'production');
const rootDir = process.cwd();
const BuildHash = '🚀' + (process.env.npm_package_version || '').replace(/\./g, '-');

const prodExtractCSS = (use) => {
	if (!isProd) { return use; }
	const [fallback, ...remainingUse] = use;
	return ExtractTextPlugin.extract({
		fallback,
		use: remainingUse,
	});
};

const WebpackConfigBase = {
	context: rootDir,

	resolve: {
		extensions: ['.js'],

		alias: {
			'@square/orbit': resolve(rootDir, 'src'),
			vue$: 'vue/dist/vue.common.js',
			testing: resolve(rootDir, 'testing'),
			'popper.js': '@square/orbit/utils/popper',
			'_popper.js': require.resolve('popper.js'),
		},
	},

	devtool: 'source-map',

	output: {
		filename: '[name].js',
		path: rootDir,
		publicPath: '/',
		libraryTarget: 'umd',
	},

	externals: [
		...Object.keys(pkg.peerDependencies),
	],

	module: {
		rules: [
			{
				test: /src\/components\/.+?\/index\.js/,
				loader: 'code-inject-loader',
				options: {
					prepend: `import '@square/orbit/utils/dev-mode';`,
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: !isProd ? cacheLoader(
					'vue-loader',
					'vue-template-compiler',
				) : {},
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: !isProd ? cacheLoader(
					'@babel/core',
					'../.babelrc',
					'../.browserslistrc',
				) : {},
			},
			{
				test: /\.css$/,
				oneOf: [
					// Matches `<style module>`
					{
						resourceQuery: /module/,
						use: prodExtractCSS([
							'vue-style-loader',
							{
								loader: 'css-loader',
								options: {
									importLoaders: 2,
									modules: true,
									localIdentName: !isProd ? '[local]_[hash:base64:5]' : `${BuildHash}[hash:base64:5]`,
								},
							},
							'postcss-loader',
						]),
					},

					// Matches plain `<style>` or `<style scoped>`
					{
						use: prodExtractCSS([
							'vue-style-loader',
							{
								loader: 'css-loader',
								options: {
									importLoaders: 2,
								},
							},
							'postcss-loader',
						]),
					},
				],
			},
			{
				test: /icons\/.+?\.svg$/,
				use: [
					{
						loader: 'vue-loader',
						options: !isProd ? cacheLoader(
							'vue-loader',
							'vue-template-compiler',
						) : {},
					},
					{
						loader: 'htmlvue-loader',
						options: {
							vPre: true,
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{ removeTitle: true },
								{
									removeAttrs: {
										attrs: 'svg:(xmlns|width|height)',
									},
								},
							],
						},
					},
				],
			},
			{
				test: /\.(woff|woff2)$/,
				use: [
					...(isProd ? [] : [{
						loader: 'cache-loader',
						options: cacheLoader('url-loader'),
					}]),
					{
						loader: 'url-loader',
						options: {
							limit: 100000,
						},
					},
				],
			},
			{
				test: /\.(js|vue|md)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src')],
				options: {
					cache: !isProd,
					emitWarning: !isProd,
					formatter: eslintFormatter,
				},
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
		new webpack.EnvironmentPlugin(['npm_package_version']),
		new webpack.DefinePlugin({
			'process.env.VUE_SUPPORT': JSON.stringify(pkg.peerDependencies.vue),
		}),
	],
};

module.exports = WebpackConfigBase;

const assert = require('assert');
const { e2e, component, public: publicMode } = process.env;

assert(e2e || component, 'You must pass in a component to develop (eg. component=Dialog npm run dev)');
if (component) {
	require.resolve(`../src/components/${component}`);
	console.log(`Running demo for '${component}'`);
}

const isPublicMode = (publicMode === 'true');

if (isPublicMode) {
	console.log('Running server in public mode');
}

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const WebpackConfigBase = require('./webpack.config.base');
const cacheLoader = require('./cacheLoader');
const pkg = require('../package.json');
const peerDepsQuery = Object.entries(pkg.peerDependencies).map(([k, v]) => `${k}=${v}`).join('&');

const e2eComponents = e2e ? (
	glob.sync(
		'components/**/[A-Z]*/tests/e2e/smoke.vue',
		{ cwd: path.resolve('./src') },
	)
	.map(p => ({
		e2eDir: path.dirname(p),
		compPath: p.replace(/^components\/|\/tests\/.+/g, ''),
		compName: p.match(/[A-Z]\w+/)[0],
	}))
) : [];

const WebpackConfigDev = merge(WebpackConfigBase, {
	entry: {
		'dev-script': './build/dev/dev-script',
	},

	resolve: {
		alias: {
			'@': `@square/orbit/components/${component || 'Button'}`,
		},
	},

	output: {
		path: path.resolve(WebpackConfigBase.context, 'dist'),
	},

	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{
						loader: 'vue-loader',
						options: cacheLoader(
							'vue-loader',
							'vue-template-compiler',
						),
					},
					{
						loader: 'mdvue-loader',
						options: {
							markdownItOpts: {
								html: true,
								linkify: true,
								typographer: true,
							},
							buildDemos: true,
						},
					},
				],
			},
			{
				test: /doc\/.+?\.svg$/,
				use: [
					{
						loader: 'cache-loader',
						options: cacheLoader('url-loader'),
					},
					'url-loader?limit=100000',
				]
			},
		],
	},

	devServer: {
		hot: true,

		compress: true,

		disableHostCheck: isPublicMode,

		contentBase: [
			path.resolve(WebpackConfigBase.context, 'dist'),
			path.resolve(WebpackConfigBase.context, 'build/dev'),
		],

		publicPath: '/',

		historyApiFallback: {
			index: 'index.html',
		},

		openPage: '?' + peerDepsQuery,

		before(app, server) {
			app.get('*', (req, res, next) => {
				const hasExt = /\.\w+$/.test(req.params[0]);
				const hasQuery = Object.keys(req.query).length;
				if (!hasExt && !hasQuery) {
					return res.redirect(req.originalUrl + '?' + peerDepsQuery);
				}
				next();
			});
		},
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),

		...(component ? [new StyleLintPlugin({
			configFile: '.stylelintrc.js',
			files: [`./src/components/${component}/src/*.{css,vue}`],
			emitErrors: false,
		})] : []),

		new webpack.DefinePlugin({
			'process.env.E2E_COMPONENTS': JSON.stringify(e2eComponents.map(({ compPath }) => compPath)),
		}),
	],
});

module.exports = WebpackConfigDev;
// const util = require('util');
// console.log(util.inspect(WebpackConfigDev, { colors: true, depth: null }));

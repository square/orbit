const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const WebpackConfigBase = require('./webpack.config.base');
const ExternalsPlugin = require('./plugins/ExternalsPlugin');
const isProduction = (process.env.NODE_ENV === 'production');
const isWatch = process.argv.includes('--watch');

const componentFiles = (() => {
	const components = glob.sync('components/**/[A-Z]*/index.js', { cwd: path.resolve('./src') });

	return components.reduce((acc, component) => {
		component = component.replace(/\/index.js$/, '');
		acc[component] = `./src/${component}`;
		return acc;
	}, {});
})();

const utilFiles = (() => {
	const utils = glob.sync('utils/*', { cwd: path.resolve('./src') });

	return utils.reduce((acc, util) => {
		acc[util.replace(/\..+$/, '')] = `./src/${util}`;
		return acc;
	}, {});
})();

const CSSfiles = {
	styles: Object.values(componentFiles).concat(Object.values(utilFiles)),
};

function resolvePath(aliases, req) {
	if (!req.match(/^\w/)) { return req; }

	const split = req.split(path.sep);

	while (aliases.hasOwnProperty(split[0])) {
		split.splice(0, 1, ...aliases[split[0]].split(path.sep));
	}

	return split.join(path.sep);
}

function getEntryContext({ context: root, entry }, context) {
	const entryContexts = Array.from(Object.keys(entry).reduce((agg, entry) => {
		const entryContext = entry.split(path.sep).slice(0, -1).join(path.sep);
		if (entryContext) {
			agg.add(entryContext);
		}
		return agg;
	}, new Set())).sort((a, b) => b.length - a.length);

	for (const entryCtx of entryContexts) {
		const fullPath = `${root}/src/${entryCtx}`;

		if (context.match(fullPath)) {
			return fullPath;
		}
	}
}

const WebpackConfigBuild = merge(WebpackConfigBase, {

	entry: {
		...componentFiles,
		...utilFiles,
		...CSSfiles,
	},

	node: {
		process: false,
	},

	plugins: [
		new ExternalsPlugin(WebpackConfigBase.output.libraryTarget, [
			({ context, request, reqResolved, issuer, rootIssuers }, callback) => {
				callback(null, (() => {
					const { alias } = WebpackConfigBuild.resolve;

					const selfRef = alias['@square/orbit'];
					const entryPath = reqResolved.replace(/(\/index)?\.\w+$/, '').replace(`${selfRef}/`, '')

					// Is the target getting required an entry-point?
					if (!WebpackConfigBuild.entry[entryPath] || !rootIssuers) {
						return undefined;
					}

					let relativePath = rootIssuers.map((issue) =>
						path.relative(path.dirname(issue), reqResolved).replace(/(\/index)?\.\w+$/, '').replace(/^\.\.\//, '')
					);
					relativePath = Array.from(new Set(relativePath));

					if (relativePath.length > 1 || relativePath.length === 0) {
						throw new Error('Error' + JSON.stringify(relativePath));
					}

					return relativePath[0].startsWith('..') ? relativePath[0] : `./${relativePath[0]}`;
				})());
			},
		]),

		// Commented until CSS is pure
		// new StyleLintPlugin({
		// 	configFile: '.stylelintrc.js',
		// 	files: [`./src/**/*.{css,vue}`],
		// }),

		new ExtractTextPlugin({

			// Only extract CSS from specified files
			filename(getPath) {
				const destFile = getPath('[name].css');

				if (Object.keys(CSSfiles).some(CSSfile => destFile.match(CSSfile))) {
					return destFile;
				}

				return '.orbitExtraCSS';
			},
		}),

		new CopyWebpackPlugin([{
			from: 'src/styles/vars.css',
			to: 'vars.css',
		}]),

		// Clean up JS files for CSS entry points
		{
			apply(compiler) {
				compiler.plugin('done', (stats) => {
					const { outputPath: cwd } = stats.compilation.compiler;

					[
						// Created by the ExtractTextPlugin
						['.orbitExtraCSS'],
						...Object.keys(CSSfiles).map(CSSfile => glob.sync(`${CSSfile}.{js,js.map}`, { cwd })),
					].forEach(files => files.forEach(file => fs.unlink(path.resolve(cwd, file), () => {})));
				});
			},
		},

		...(isProduction && !isWatch ? [
			new UglifyJSPlugin({
				sourceMap: true,
				parallel: true,
				uglifyOptions: {
					ecma: 5,
					output: {
						comments: false,
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					discardComments: { removeAll: true },
					discardUnused: false,
					reduceIdents: false,
					map: {
						inline: false,
					},
				},
			}),
		] : []),

		...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
	],
});

module.exports = WebpackConfigBuild;
// const util = require('util');
// console.log(util.inspect(WebpackConfigBuild, { colors: true, depth: null }));

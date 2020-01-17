const WebpackConfig = require('../build/webpack.config.base.js');

WebpackConfig.externals = undefined;

const { component = '**' } = process.env;
const files = `../src/components/${component}/tests/*.js`;

module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		files: [files],
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true,
		},
		browsers: [
			'ChromeHeadless',
			'Firefox',
			'SafariPrivate',
		],
		webpack: WebpackConfig,
		preprocessors: {
			[files]: [
				'webpack',
				// 'sourcemap'
			],
		},
		// autoWatch: false,
		singleRun: true, // Karma captures browsers, runs the tests and exits
		concurrency: Infinity,
	});
};

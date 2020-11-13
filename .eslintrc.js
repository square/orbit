module.exports = {
	root: true,
	extends: ['plugin:vue/recommended', 'airbnb-base'],
	plugins: [
		'vue',
		'markdown',
	],
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true,
		jasmine: true,
	},

	settings: {
		'import/resolver': {
			webpack: {
				config: './build/webpack.config.base',
			},
		},
	},

	rules: {
		'import/prefer-default-export': 'off',

		// https://eslint.org/docs/user-guide/migrating-to-4.0.0#indent-rewrite
		'indent': 'off',
		'indent-legacy': ['error', 'tab'],
		'no-tabs': 'off',
		'vue/html-indent': ['error', 'tab'],

		'no-underscore-dangle': 'off',

		'no-param-reassign': 'off', // https://github.com/airbnb/javascript/issues/1217#issuecomment-286927523

		// Dependencies aren't installed when linting PRs
		'import/no-unresolved': (process.env.NODE_ENV === 'pr_lint') ? 'off' : ['error', { ignore: ['^doc'] }],
		'import/extensions': (process.env.NODE_ENV === 'pr_lint') ? 'off' : 'error',
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: [
				'**/tests/**', // component tests
				'**/webpack.config.js', // webpack config
				'**/webpack.config.*.js', // webpack config

			],
			optionalDependencies: false,
		}],


		// https://github.com/eslint/eslint/issues/11035
		'vue/comment-directive': 'off',
	},
};
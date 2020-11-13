const { resolve } = require('./build/webpack.config.base');
const aliases = resolve.alias;

module.exports = {
	plugins: [
		require('postcss-import')({
			resolve(req, issuer) {

				// Allow *.md doc files to only access `@square/orbit/vars.css`
				if (issuer.endsWith('/doc')) {
					if (req === '@square/orbit/vars.css') {
						return __dirname + '/src/styles/vars.css';
					}
					return false;
				}

				for (let alias in aliases) {
					req = req.replace(new RegExp('^' + alias), aliases[alias]);
				}

				return req;
			}
		}),
		require('postcss-custom-properties')({
			preserve: false,
		}),
		require('postcss-preset-env')({
			stage: 0,
			preserve: false,
		}),
		require('postcss-calc')(),
		require('postcss-color-function')(),
		require('postcss-flexbugs-fixes')(),
		require('postcss-input-range')(),
		require('postcss-browser-reporter')(),
		require('postcss-reporter')(),
	],
};

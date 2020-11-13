const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

module.exports = (...ident) => {
	const cacheIdentifier = crypto.createHash('md5').update((() => {
		const key = ident.map((moduleName) => {
			try {
				if (!moduleName.startsWith('.')) {
					return require(moduleName + '/package.json');
				}
				return require(moduleName);
			} catch(e) {
				return fs.readFileSync(path.join(__dirname, moduleName)).toString();
			}
		});

		return JSON.stringify(key);
	})()).digest('hex');

	return {
		cacheDirectory: path.resolve('.cache-loader'),
		cacheIdentifier,
	};
};

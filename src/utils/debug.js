const isProduction = (typeof process === 'object') && (typeof process.env === 'object') && (process.env.NODE_ENV === 'production');

const showWarning = isProduction ? () => {} : (componentName, ...args) => {
	console.warn(`[Orbit warn][${componentName}]:`, ...args); // eslint-disable-line no-console
};

const throwError = (componentName, msg) => {
	throw new Error(`[Orbit error][${componentName}]: ${msg}`);
};

function createAssert(type) {
	return (value, componentName, msg) => {
		if (value) { return; }
		(type === 'warn' ? showWarning : throwError)(componentName, msg);
	};
}
const assert = {
	warn: createAssert('warn'),
	error: createAssert('error'),
};

export { showWarning, throwError, assert };

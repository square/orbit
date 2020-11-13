/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const flatMap = require('lodash/flatMap');
const ExternalModule = require("webpack/lib/ExternalModule");

class ExternalModuleFactoryPlugin {
	constructor(type, externals) {
		this.type = type;
		this.externals = externals;
	}

	apply(normalModuleFactory) {
		const depTrace = {};

		const entryPoints = new Set();

		function findParent(issuer, visited = []) {
			// Base-case: if it can't find a parent, or if it hits an entry point
			if (
				!depTrace.hasOwnProperty(issuer)
				|| entryPoints.has(issuer)
			) {
				return [issuer];
			}

			// Circular dependency: ignore
			if (visited.includes(issuer)) {
				return [];
			}

			visited.push(issuer);
			return flatMap(depTrace[issuer], issuer => findParent(issuer, visited));
		}

		const globalType = this.type;
		normalModuleFactory.plugin("factory", factory => (data, callback) => {
			const context = data.context;
			const dependency = data.dependencies[0];

			function handleExternal(value, type, callback) {
				if(typeof type === "function") {
					callback = type;
					type = undefined;
				}
				if(value === false) return factory(data, callback);
				if(value === true) value = dependency.request;
				if(typeof type === "undefined" && /^[a-z0-9]+ /.test(value)) {
					const idx = value.indexOf(" ");
					type = value.substr(0, idx);
					value = value.substr(idx + 1);
				}
				callback(null, new ExternalModule(value, type || globalType, dependency.request));
				return true;
			}
			(function handleExternals(externals, callback) {
				if(typeof externals === "string") {
					if(externals === dependency.request) {
						return handleExternal(dependency.request, callback);
					}
				} else if(Array.isArray(externals)) {
					let i = 0;
					(function next() {
						let asyncFlag;
						const handleExternalsAndCallback = function handleExternalsAndCallback(err, module) {
							if(err) return callback(err);
							if(!module) {
								if(asyncFlag) {
									asyncFlag = false;
									return;
								}
								return next();
							}
							callback(null, module);
						};

						do {
							asyncFlag = true;
							if(i >= externals.length) return callback();
							handleExternals(externals[i++], handleExternalsAndCallback);
						} while (!asyncFlag); // eslint-disable-line keyword-spacing
						asyncFlag = false;
					}());
					return;
				} else if(externals instanceof RegExp) {
					if(externals.test(dependency.request)) {
						return handleExternal(dependency.request, callback);
					}
				} else if(typeof externals === "function") {


					factory(data, function(err, createdModule) {
						const reqResolved = createdModule.resource;
						const { issuer } = data.contextInfo;

						if (!issuer) {
							entryPoints.add(reqResolved);
						}

						const args = {
							context,
							request: dependency.request,
							reqResolved,
							issuer,
						};

						if (issuer) {
							if (reqResolved !== issuer) {
								if (!depTrace[reqResolved]) {
									depTrace[reqResolved] = [];
								}
								depTrace[reqResolved].push(issuer);
							}

							// Find root issuer
							args.rootIssuers = Array.from(new Set(findParent(issuer)));
						}

						externals.call(
							null,
							args,
							function(err, value, type) {
								if(err) return callback(err);
								if(typeof value !== "undefined") {
									handleExternal(value, type, callback);
								} else {
									callback();
								}
							}
						);
					});
					return;
				} else if(typeof externals === "object" && Object.prototype.hasOwnProperty.call(externals, dependency.request)) {
					return handleExternal(externals[dependency.request], callback);
				}
				callback();
			}(this.externals, function(err, module) {
				if(err) return callback(err);
				if(!module) return handleExternal(false, callback);
				return callback(null, module);
			}));
		});
	}
}
module.exports = ExternalModuleFactoryPlugin;

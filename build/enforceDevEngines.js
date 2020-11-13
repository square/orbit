const assert = require('assert');
const semver = require('semver');
const { devEngines } = require('../package.json');
const { node: expectedVersion } = devEngines;
const currentVersion = process.version.replace('v', '');

assert(semver.satisfies(currentVersion, expectedVersion), `Detected Node v${currentVersion}. You must be running Node ${expectedVersion}`);

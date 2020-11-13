#!/usr/bin/env node

const path = require('path');
const glob = require('glob');
const config = require('../webpack.config.build');
const { entry, output } = config;

const files = [
	'vars.css',
];

for (const destPath in entry) {

	if (!entry.hasOwnProperty(destPath)) { continue; }

	const matches = glob.sync(destPath + '.{js,js.map,css,css.map}');

	files.push(...matches);
}

console.log(files.join(' '));

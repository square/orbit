import Vue from 'vue';
import { mount } from '@vue/test-utils';

console.error = console.warn = (...args) => { throw new Error(args); };

function testComponents(components) {
	return (template, opt = {}) => mount({
		template,
		components,
		...opt,
	}, { clone: false });
}

function randomInt(min=0, max=100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStr() {
	return Math.random().toString(36).substr(2);
}

export {
	testComponents,
	randomInt,
	randomStr,
};

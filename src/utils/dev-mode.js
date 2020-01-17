import { assert } from '@square/orbit/utils/debug';
import { satisfies } from 'semver';
import Vue from 'vue';

const isProduction = (typeof process === 'object') && (typeof process.env === 'object') && (process.env.NODE_ENV === 'production');

if (!isProduction && typeof fetch === 'function') {
	// eslint-disable-next-line no-console
	console.info(
		'🚀 [Orbit Dev]',
		'Orbit is running in developer mode. Configure your build to put in production mode. https://webpack.js.org/guides/production/',
	);

	(function vueVersionChecker() {
		const { version: vueVersion } = Vue;
		const vueSupport = process.env.VUE_SUPPORT;
		const satisfiesRange = satisfies(vueVersion, vueSupport);
		assert.warn(
			satisfiesRange,
			'Unsupported Vue',
			`You're using Vue v${vueVersion}. This version of Orbit is developed to be compatible with versions ${vueSupport}.`,
		);
	}());
}

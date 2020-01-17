import { assert } from '@square/orbit/utils/debug';
import Tooltip from 'tooltip.js';
import $s from './Hovertip.css?module';

const HovertipInnerSelector = $s.HovertipInner.split(' ').map(className => `.${className}`).join();

const getOpts = value => ({
	title: value.content || value,
	delay: value.delay || 0,
	container: document.body,
});

const instances = new WeakMap();

const init = (el, value) => {
	if (!value) { return; }
	assert.error(typeof value === 'string' || typeof value.content === 'string', 'Hovertip', 'Hovertip expects a string value to be passed in.');

	let tooltip = instances.get(el);

	if (!tooltip) {
		tooltip = new Tooltip(el, {
			...getOpts(value),
			offset: '0, 8',
			template: `
				<div class="${$s.Hovertip}" role="tooltip">
					<div class="${$s.HovertipInner}" />
				</div>
			`,
			innerSelector: HovertipInnerSelector,
		});

		instances.set(el, tooltip);
	} else {
		Object.assign(tooltip.options, getOpts(value));
		tooltip.updateTitleContent(tooltip.options.title);
	}
};

const destroy = (el) => {
	if (!instances.has(el)) { return; }
	const tooltip = instances.get(el);
	tooltip.hide();
	tooltip.dispose();
	instances.delete(el);
};

export default {
	bind: (el, { value }) => init(el, value),
	update: (el, { value }) => init(el, value),
	unbind: el => destroy(el),
};

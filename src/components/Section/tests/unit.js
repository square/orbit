import { testComponents } from 'testing/utils';
import { OSection } from '@square/orbit/components/Section';

const createVm = testComponents({ OSection });

describe('OSection', () => {
	it('Mount OSection with title prop and actions slot', () => {
		const wrapper = createVm(`
			<o-section title="Testing title prop">
				<template slot="actions">
					Actions slot
				</template>
				Content
			</o-section>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

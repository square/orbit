import { testComponents } from 'testing/utils';
import { ONav } from '@square/orbit/components/Nav';

const createVm = testComponents({ ONav });

describe('ONav', () => {
	it('Mount ONav', () => {
		const wrapper = createVm(`
			<o-nav :links="links">
				<template slot-scope="{ to, title }">
					<a :href="to">{{title}}</a>
				</template>
			</o-nav>
		`, {
			data() {
				return {
					links: [],
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

import { testComponents } from 'testing/utils';
import { OLayer } from '@square/orbit/components/Layer';
import { OSheet } from '@square/orbit/components/Sheet';

const createVm = testComponents({ OSheet });

describe('OSheet', () => {
	it('Mount OSheet', () => {
		const SomeSheet = {
			template: `
				<o-sheet>
					<template slot="title">
						Title
					</template>

					<template slot="actions">
						Actions
					</template>

					Hello World

				</o-sheet>
			`,

			components: {
				OSheet,
			},

			mounted() {
				expect(this._isMounted).toBe(true);
			},
		};

		const wrapper = createVm(`
			<o-layer id="mountId" />
		`, {
			components: {
				OLayer,
				SomeSheet,
			},

			mounted() {
				OLayer.openInLayer('mountId', SomeSheet);
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

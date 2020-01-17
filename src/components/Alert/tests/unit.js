import { testComponents } from 'testing/utils';
import { OAlert } from '@square/orbit/components/Alert';
import { OLayer } from '@square/orbit/components/Layer';

const createVm = testComponents({ OAlert });

describe('OAlert', () => {
	it('Mount OAlert', () => {
		const SomeAlert = {
			template: `
				<o-alert>
					Hello world
				</o-alert>
			`,

			components: {
				OAlert,
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
				SomeAlert,
			},

			mounted() {
				OLayer.openInLayer('mountId', SomeAlert);
			},
		});

		expect(wrapper.vm._isMounted).toBe(true);
	});
});

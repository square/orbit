import { testComponents } from 'testing/utils';
import { OLayer } from '@square/orbit/components/Layer';
import { OModal, OModalPane } from '@square/orbit/components/Modal';

const createVm = testComponents({ OLayer, OModal, OModalPane });

describe('OModal', () => {
	it('Mount OModal', () => {
		const SomeModal = {
			template: `
				<o-modal>
					<o-modal-pane title="Hello World">
						Hello World
					</o-modal-pane>
				</o-modal>
			`,

			components: {
				OModal,
				OModalPane,
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
				SomeModal,
			},

			mounted() {
				OLayer.openInLayer('mountId', SomeModal);
			},
		});

		expect(wrapper.vm._isMounted).toBe(true);
	});
});

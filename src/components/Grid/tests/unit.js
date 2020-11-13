import { testComponents } from 'testing/utils';
import { OGrid, OGridItem } from '@square/orbit/components/Grid';

const createVm = testComponents({ OGrid, OGridItem });

describe('OGrid', () => {
	it('Mount OGrid', () => {
		const wrapper = createVm(`
			<o-grid>
				<o-grid-item>
					Hello World
				</o-grid-item>
			</o-grid>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('Reactive grid-item', () => {
		createVm(`
			<o-grid>
				<o-grid-item ref="gridItem">
					{{ text }}
				</o-grid-item>
			</o-grid>
		`, {

			data() {
				return {
					text: 'Old content',
				};
			},

			mounted() {
				this.text = 'New content';

				this.$nextTick(() => {
					if (this.$refs && this.$refs.gridItem && this.$refs.gridItem.innerText) {
						const slotContent = this.$refs.gridItem.innerText.trim();
						expect(slotContent).toBe(this.text);
					}
				});
			},
		});
	});
});

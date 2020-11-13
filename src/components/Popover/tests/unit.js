import { testComponents } from 'testing/utils';
import { OPopover, OPopoverLayer, PopoverAPIProvider } from '@square/orbit/components/Popover';

const createVm = testComponents({ OPopover });

describe('OPopover', () => {
	it('Mount OPopover', () => {
		let clicked = false;

		const SomePopover = {
			template: `
				<o-popover>
					<template slot="action" slot-scope="popover">
						<button @click="clickHandler(popover, $event)">Open Popover</button>
					</template>

					Hello World
				</o-popover>
			`,

			components: {
				OPopover,
			},

			methods: {
				clickHandler: (popover, $event) => {
					popover.open();
					clicked = $event;
				},
			},

			mounted() {
				expect(this._isMounted).toBe(true);
			},
		};

		const wrapper = createVm(`
			<div>
				<o-popover-layer :id="popoverLayer" />
				<SomePopover />
			</div>
		`, {
			components: {
				OPopoverLayer,
				SomePopover,
			},

			mixins: [PopoverAPIProvider],
		});

		expect(wrapper.vm._isMounted).toBe(true);
		wrapper.find('button').trigger('click');
		expect(clicked).not.toBe(false);
	});
});

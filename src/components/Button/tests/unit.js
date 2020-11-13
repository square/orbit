import { testComponents, randomStr } from 'testing/utils';
import { OButton } from '@square/orbit/components/Button';

const createVm = testComponents({ OButton });

describe('OButton', () => {
	it('Button text in slot', () => {
		const buttonText = randomStr();
		const wrapper = createVm(`<o-button>${buttonText}</o-button>`);

		expect(wrapper.vm.$el.textContent.trim()).toBe(buttonText);
	});

	it('Handle button click', () => {
		let clicked = false;

		const wrapper = createVm('<o-button @click="clickHandler">Button Text</o-button>', {
			methods: {
				clickHandler: (e) => { clicked = e; },
			},
		});

		wrapper.find('button').trigger('click');

		expect(clicked).not.toBe(false);
	});
});

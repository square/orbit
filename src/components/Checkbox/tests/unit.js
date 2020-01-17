import { testComponents } from 'testing/utils';
import { OCheckbox } from '@square/orbit/components/Checkbox';

const createVm = testComponents({ OCheckbox });

describe('OCheckbox', () => {
	it('Mount', () => {
		const wrapper = createVm(`
			<o-checkbox>
				Hello World
			</o-checkbox>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('Default value as false', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: false,
				};
			},
		});

		const checkbox = wrapper.find({ ref: 'checkbox' }).find('input[type=checkbox]');

		expect(checkbox.element.checked).toBe(wrapper.vm.checked);
	});

	it('Default value as true', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: true,
				};
			},
		});

		const checkbox = wrapper.find({ ref: 'checkbox' }).find('input[type=checkbox]');

		expect(checkbox.element.checked).toBe(wrapper.vm.checked);
	});

	it('Default custom-value as false', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
				true-value="hello world"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: '',
				};
			},
		});

		const checkbox = wrapper.find({ ref: 'checkbox' }).find('input[type=checkbox]');

		expect(checkbox.element.checked).toBe(false);
	});

	it('Default custom-value as true', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
				true-value="hello world"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: 'hello world',
				};
			},
		});

		const checkbox = wrapper.find({ ref: 'checkbox' }).find('input[type=checkbox]');

		expect(checkbox.element.checked).toBe(true);
	});

	it('React to bindings', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: false,
				};
			},
		});

		const checkbox = wrapper.find({ ref: 'checkbox' }).find('input[type=checkbox]');

		expect(checkbox.element.checked).toBe(false);

		wrapper.setData({ checked: true });

		expect(checkbox.element.checked).toBe(true);
	});

	it('React to click on OCheckbox', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: false,
				};
			},
		});

		expect(wrapper.vm.checked).toBe(false);

		const checkbox = wrapper.find({ ref: 'checkbox' });
		document.body.appendChild(checkbox.element);
		checkbox.find('label').element.click();

		expect(wrapper.vm.checked).toBe(true);
	});

	it('React to click on OCheckbox with custom true-value', () => {
		const trueValue = 'hello world';
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
				true-value="${trueValue}"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: false,
				};
			},
		});

		expect(wrapper.vm.checked).toBe(false);

		const checkbox = wrapper.find({ ref: 'checkbox' });
		document.body.appendChild(checkbox.element);
		checkbox.find('label').element.click();

		expect(wrapper.vm.checked).toBe(trueValue);
	});

	it('React to click on OCheckbox with custom true-value', () => {
		const trueValue = 'hello world';
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
				true-value="${trueValue}"
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: false,
				};
			},
		});

		expect(wrapper.vm.checked).toBe(false);

		const checkbox = wrapper.find({ ref: 'checkbox' });
		document.body.appendChild(checkbox.element);
		checkbox.find('label').element.click();

		expect(wrapper.vm.checked).toBe(trueValue);
	});

	it('Bound to array', () => {
		const wrapper = createVm(`
			<div>
				<o-checkbox
					ref="checkbox1"
					v-model="checkedAstronauts"
					value="Neil Armstrong"
				>
					Neil Armstrong
				</o-checkbox>
				<o-checkbox
					ref="checkbox2"
					v-model="checkedAstronauts"
					value="Buzz Aldrin"
				>
					Buzz Aldrin
				</o-checkbox>
				<o-checkbox
					ref="checkbox3"
					v-model="checkedAstronauts"
					value="Sally Ride"
				>
					SallyRide
				</o-checkbox>
			</div>
		`, {
			data() {
				return {
					checkedAstronauts: ['Neil Armstrong'],
				};
			},
		});

		const checkbox1 = wrapper.find({ ref: 'checkbox1' });
		const checkbox2 = wrapper.find({ ref: 'checkbox2' });
		const checkbox3 = wrapper.find({ ref: 'checkbox3' });

		expect(checkbox1.find('input[type="checkbox"]').element.checked).toBe(true);
		expect(checkbox2.find('input[type="checkbox"]').element.checked).toBe(false);
		expect(checkbox3.find('input[type="checkbox"]').element.checked).toBe(false);


		expect(wrapper.vm.checkedAstronauts).not.toContain('Buzz Aldrin');

		document.body.appendChild(checkbox2.element);
		checkbox2.find('label').element.click();

		expect(wrapper.vm.checkedAstronauts).toContain('Buzz Aldrin');
	});

	it('Set disabled state', () => {
		const wrapper = createVm(`
			<o-checkbox
				ref="checkbox"
				v-model="checked"
				disabled
			>
				Hello World
			</o-checkbox>
		`, {
			data() {
				return {
					checked: false,
				};
			},
		});

		const checkbox = wrapper.find({ ref: 'checkbox' });

		expect(checkbox.find('input[type="checkbox"]').element.matches(':disabled')).toBe(true);
	});
});

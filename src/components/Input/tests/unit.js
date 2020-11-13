import { testComponents, randomStr } from 'testing/utils';
import { OInput } from '@square/orbit/components/Input';

const createVm = testComponents({ OInput });

describe('OInput', () => {
	it('Pass in value', () => {
		const inputStr = randomStr();

		const wrapper = createVm('<o-input :value="inputData" />', {
			data() {
				return {
					inputData: inputStr,
				};
			},
		});

		expect(wrapper.find('input').element.value).toBe(inputStr);
	});

	it('Update prop via v-model', () => {
		const inputStartStr = randomStr();
		const inputEndStr = randomStr();
		const wrapper = createVm('<o-input v-model="inputData" />', {
			data() {
				return {
					inputData: inputStartStr,
				};
			},
		});

		expect(wrapper.find('input').element.value).toBe(inputStartStr);

		wrapper.vm.inputData = inputEndStr;

		wrapper.vm.$nextTick(() => expect(wrapper.find('input').element.value).toBe(inputEndStr));
	});

	it('Update prop via input', () => {
		const inputStr = randomStr();
		const wrapper = createVm('<o-input v-model="inputData" />', {
			data() {
				return {
					inputData: '',
				};
			},
		});

		const inputEl = wrapper.find('input');

		inputEl.element.value = inputStr;
		inputEl.trigger('input');

		wrapper.vm.$nextTick(() => expect(wrapper.vm.inputData).toBe(inputStr));
	});

	it('Update initially undefined value via input', () => {
		const inputStr = randomStr();
		const wrapper = createVm(
			`<o-input
				v-model="inputData"
				@input="gotInputEvent = true"
			/>`,
			{
				data() {
					return {
						inputData: undefined,
						gotInputEvent: false,
					};
				},
			},
		);

		const inputEl = wrapper.find('input');

		inputEl.element.value = inputStr;
		inputEl.trigger('input');

		wrapper.vm.$nextTick(() => {
			expect(wrapper.vm.inputData).toBe(inputStr);
			expect(wrapper.vm.gotInputEvent).toBe(true);
		});
	});

	it('Update value through @input:update event', () => {
		const inputStr = randomStr();
		const wrapper = createVm('<o-input :value="inputData" @input:update="inputData = $event"/>', {
			data() {
				return {
					inputData: '',
				};
			},
		});

		const inputEl = wrapper.find('input');

		inputEl.element.value = inputStr;
		inputEl.trigger('input');

		wrapper.vm.$nextTick(() => expect(wrapper.vm.inputData).toBe(inputStr));
	});

	it('blur, change, focus, input, keyup events working', () => {
		const wrapper = createVm(
			`<o-input
				v-model="inputData"
				@blur="blur = true"
				@change="change = true"
				@focus="focus = true"
				@input="input = true"
				@keyup="keyup = true"
			/>`,
			{
				data() {
					return {
						inputData: '',
						blur: false,
						change: false,
						focus: false,
						input: false,
						keyup: false,
					};
				},
			},
		);

		const inputEl = wrapper.find('input');
		inputEl.trigger('blur');
		inputEl.trigger('change');
		inputEl.trigger('focus');
		inputEl.trigger('input');
		inputEl.trigger('keyup');
		wrapper.vm.$nextTick(() => expect(wrapper.vm.blur
			&& wrapper.vm.change
			&& wrapper.vm.focus
			&& wrapper.vm.input
			&& wrapper.vm.keyup).toBe(true));
	});
});

import { testComponents, randomStr } from 'testing/utils';
import { OPassword } from '@square/orbit/components/Password';

const createVm = testComponents({ OPassword });

describe('OPassword', () => {
	it('Pass in value', () => {
		const inputStr = randomStr();
		const wrapper = createVm('<o-password :value="inputData" />', {
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
		const wrapper = createVm('<o-password v-model="inputData" />', {
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
		const wrapper = createVm('<o-password v-model="inputData" />', {
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
});

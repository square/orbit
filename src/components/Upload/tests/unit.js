import { testComponents } from 'testing/utils';
import { OUpload } from '@square/orbit/components/Upload';

const createVm = testComponents({ OUpload });

describe('OUpload', () => {
	it('mounts', () => {
		const wrapper = createVm(`
			<o-upload label="Upload"></o-upload>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('mounts with drop variant', () => {
		const wrapper = createVm(`
			<o-upload
				label="Upload"
				variant="drop"
			></o-upload>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('can toggle drop variant', () => {
		const wrapper = createVm(`
			<o-upload
				label="Upload"
				:variant="variant"
			></o-upload>
		`, {
			data() {
				return {
					variant: 'button',
				};
			},
			created() {
				this.variant = 'drop';
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

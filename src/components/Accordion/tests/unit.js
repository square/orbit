import { testComponents } from 'testing/utils';
import { OAccordion, OAccordionItem } from '@square/orbit/components/Accordion';

const createVm = testComponents({ OAccordion, OAccordionItem });

describe('OAccordion', () => {
	it('mounts with multiple panels', () => {
		const wrapper = createVm(`
			<o-accordion :open="0">
				<o-accordion-item label="Label1">
					Hello World
				</o-accordion-item>
				<o-accordion-item label="Label2">
					Goodbye World
				</o-accordion-item>
			</o-accordion>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('mounts with single-panel', () => {
		const wrapper = createVm(`
			<o-accordion label="Label">
				Hello World

				<div>
					Hello World
				</div>
			</o-accordion>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

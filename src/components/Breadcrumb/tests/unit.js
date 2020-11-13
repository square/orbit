import { testComponents } from 'testing/utils';
import { OBreadcrumb } from '@square/orbit/components/Breadcrumb';

const createVm = testComponents({ OBreadcrumb });

describe('OBreadcrumb', () => {
	it('Mount OBreadcrumb', () => {
		const wrapper = createVm(`
			<o-breadcrumb :crumbs="crumbs">
			</o-breadcrumb>
		`, {

			data() {
				return {
					crumbs: [
						{
							label: 'Milky Way',
							to: '/milky-way',
						},
						{
							label: 'Solar System',
							to: '/solar-system',
						},
						{
							label: 'Earth',
						},
					],
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

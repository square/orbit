import { testComponents } from 'testing/utils';
import { OTable, OTableCol } from '@square/orbit/components/Table';

const createVm = testComponents({ OTable, OTableCol });

describe('OTable', () => {
	it('Mount OTable', () => {
		const wrapper = createVm(`
			<o-table :row-data="tableData">
				<o-table-col property="name">Column Name</o-table-col>
			</o-table>
		`, {

			data() {
				return {
					tableData: [],
				};
			},
		});
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

import { testComponents } from 'testing/utils';
import { OTiles, OTileItem } from '@square/orbit/components/Tiles';

const createVm = testComponents({ OTiles, OTileItem });

describe('OTiles', () => {
	it('mounts', () => {
		const wrapper = createVm(`
			<o-tiles>
				<o-tile-item :value="1"></o-tile-item>
			</o-tiles>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});

	it('accepts falsy values for OTileItems', () => {
		const wrapper = createVm(`
			<o-tiles>
				<o-tile-item :value="0"></o-tile-item>
				<o-tile-item :value="false"></o-tile-item>
			</o-tiles>
		`);
		expect(wrapper.vm._isMounted).toBe(true);
	});
});

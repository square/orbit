import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { OPagination } from '@square/orbit/components/Pagination';

describe('OPagination', () => {
	it('Mount OPagination', () => {
		mount(OPagination, {
			propsData: {
				pages: 10,
			},
		});
	});

	it('Fail on invalid page: creation', (done) => {
		Vue.config.warnHandler = done;

		mount(OPagination, {
			propsData: {
				pages: 10,
				currentPage: -10,
			},
		});
	});

	it('Reset to last page when currentPage exceeds: mutating currentPage', () => {
		const wrapper = mount(OPagination, {
			propsData: {
				pages: 10,
				currentPage: 1,
			},
		});

		wrapper.setProps({
			currentPage: 20,
		});

		expect(wrapper.emitted()['pagination:update'][0][0]).toBe(wrapper.vm.pages);
	});

	it('Reset to last page when currentPage exceeds: mutating pages', () => {
		const wrapper = mount(OPagination, {
			propsData: {
				pages: 10,
				currentPage: 10,
			},
		});

		wrapper.setProps({
			pages: 5,
		});

		expect(wrapper.emitted()['pagination:update'][0][0]).toBe(wrapper.vm.pages);
	});

	it('Warning on invalid page: mutation', (done) => {
		Vue.config.warnHandler = done;

		const wrapper = mount(OPagination, {
			propsData: {
				pages: 10,
				currentPage: 1,
			},
		});

		wrapper.setProps({
			currentPage: -10,
		});
	});
});

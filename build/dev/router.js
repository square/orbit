import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	fallback: false,
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: '/',
			redirect: { name: 'doc' },
		},
		{
			name: 'doc',
			path: '/doc',
			components: {
				header: () => import('./Header.vue'),
				default: () => import('@/doc/index.md'),
			},
		},
		{
			name: 'smoke-test',
			path: '/smoke-test',
			components: {
				header: () => import('./Header.vue'),
				default: () => import('@/tests/e2e/smoke.vue').catch(err => import('./NotFound.vue')),
			},
		},
		{
			path: '*',
			component: () => import('./NotFound.vue'),
		},
	],
});

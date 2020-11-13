<template>
	<o-layout-header>
		<o-nav horizontal>
			<o-nav-link
				:to="{ ...$route, name: 'doc' }"
				v-hovertip="{ content: 'Component documentation page', delay: { show: 500 } }"
			>
				Documentation
			</o-nav-link>
			<o-nav-link
				:to="{ ...$route, name: 'smoke-test' }"
				v-hovertip="{ content: 'Demos of important functionality', delay: { show: 500 } }"
			>
				Smoke test
			</o-nav-link>
		</o-nav>

		<o-select
			size="small"
			placeholder="Vue version"
			v-model="vue.selected"
			:options="vue.versions"
		/>
	</o-layout-header>
</template>

<script>
import { OLayout, OLayoutHeader, OLayoutContent } from '@square/orbit/components/Layout';
import { ONav, ONavLink } from '@square/orbit/components/Nav';
import { OHovertip } from '@square/orbit/components/Hovertip';
import { OSelect } from '@square/orbit/components/Select';
import axios from 'axios';
import Vue from 'vue';
import { minor } from 'semver';

export default {
	directives: {
		Hovertip: OHovertip,
	},

	components: {
		OLayout,
		OLayoutHeader,
		OLayoutContent,
		ONav,
		ONavLink,
		OSelect,
	},

	data() {
		return {
			vue: {
				selected: Vue.version,
				versions: [],
			},
		};
	},

	async created() {
		const { data } = await axios('https://api.cdnjs.com/libraries/vue');
		const { version: latestVer, assets } = data;
		const minors = new Set();
		this.vue.versions = data.assets
			.filter(({ version }) => {
				minors.add(minor(version));
				return minors.size <= 2;
			})
			.map(({ version: v }) => ({ value: v, label: v }));
	},

	watch: {
		'vue.selected'(version) {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set('vue', version);
			window.location.search = searchParams.toString();
		},
	},
};
</script>

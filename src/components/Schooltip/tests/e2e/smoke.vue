<template>
	<o-layout has-layers>
		<o-layout-sider :collapsed="isCollapsed">
			Sider
		</o-layout-sider>

		<o-layout-content>
			<p>
				This example demonstrates the schooltips ability to reposition itself
				when the target element moves in any direction due to content changes on the page.
				Popper js currently handles repositioning when the target element moves via scroll or
				resize, but not based on dynamic content change.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p v-show="hasExtraContent">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<o-button @click="isCollapsed = !isCollapsed">
				Toggle sider
			</o-button>
			<br>
			<o-button @click="hasExtraContent = !hasExtraContent">
				Toggle content above
			</o-button>
			<schooltip />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</o-layout-content>
	</o-layout>
</template>

<script>
import { OLayout, OLayoutContent, OLayoutSider } from '@square/orbit/components/Layout';
import { OButton } from '@square/orbit/components/Button';
import Schooltip from './Schooltip.vue';

export default {
	components: {
		OLayout,
		OLayoutContent,
		OLayoutSider,
		OButton,
		Schooltip,
	},

	data() {
		return {
			isCollapsed: false,
			hasExtraContent: false,
		};
	},
};
</script>

<style module="$s">
.Heading {
	color: blue;
}
</style>

<template>
	<o-blade title="title">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit,
		sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
		nisi ut aliquip ex ea commodo consequat.
		Duis aute irure dolor in reprehenderit in voluptate
		velit esse cillum dolore eu fugiat nulla pariatur.
		Excepteur sint occaecat cupidatat non proident,
		sunt in culpa qui officia deserunt mollit anim id est laborum.

		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Open Popover
				</o-button>
			</template>
			Hello World
		</o-popover>

		<o-schooltip
			:active-tip="currentTip"
			:tip-id="0"
			placement="right"
			offset="0, 50"
		>
			<template slot="title">
				Here's a tip for your new feature
			</template>
			<template slot="message">
				Looks like you're showing the user a schooltip. Put some great
				content here to help them understand what this new feature can do.
			</template>
			<div
				slot="action"
				class="action-slot"
			>
				<a
					href="#"
					@click.prevent="toggleTip()"
				>
					No thanks, maybe later
				</a>
				<o-button
					size="small"
					@click="doSomething()"
				>
					Confirm
				</o-button>
			</div>
			<o-button @click="toggleTip()">
				Got it
			</o-button>
		</o-schooltip>

		<o-button
			variant="primary"
			@click="openAlert"
		>
			Open a layer
		</o-button>
	</o-blade>
</template>
<script>
import { OBlade } from '@square/orbit/components/Blade';
import { OPopover } from '@square/orbit/components/Popover';
import { OButton } from '@square/orbit/components/Button';
import { AlertLayer } from '@square/orbit/components/Alert';
import { OSchooltip } from '@square/orbit/components/Schooltip';
import AlertDemo from './AlertDemo.vue';

export default {
	components: {
		OBlade,
		OPopover,
		OButton,
		OSchooltip,
	},

	inject: {
		alertLayer: AlertLayer,
	},

	data() {
		return {
			currentTip: 0,
		};
	},

	methods: {
		doSomething() {
			this.toggleTip();
		},
		toggleTip() {
			this.currentTip = (this.currentTip === 0) ? null : 0;
		},
		openAlert() {
			this.alertLayer.open(AlertDemo);
		},
	},
};
</script>

<template>
	<div>
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
	</div>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OSchooltip } from '@square/orbit/components/Schooltip';

export default {
	name: 'Schooltip',

	components: {
		OButton,
		OSchooltip,
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
	},
};
</script>

<style scoped>
a {
	color: white;
}

.action-slot {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>

<template>
	<div>
		<o-heading size="title-1">
			Oversized hovertip in small popover
		</o-heading>
		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button @click="popover.toggle()">
					Open Popover
				</o-button>
			</template>
			<o-icon
				v-hovertip="'Long hovertip that doesn\'t fit inside small popover parent.'"
				class="icon"
				name="circle-question-mark"
				tabindex="0"
			/>
		</o-popover>
		<o-heading size="title-1">
			Reactive hovertip content
		</o-heading>
		<span
			v-hovertip="'Hello'"
			class="demo"
			tabindex="0"
		>
			Text
		</span>
		<div
			v-hovertip="'Hello'"
			class="demo"
			tabindex="0"
		>
			Text
		</div>
		<div
			v-hovertip="`Reactive ${count}`"
			class="demo"
			tabindex="0"
		>
			Reactive
		</div>
		<div
			v-hovertip="{ content: `Reactive ${count}`, delay: 500 }"
			class="demo"
			tabindex="0"
		>
			Reactive with delay
		</div>
	</div>
</template>

<script>
import { OHovertip } from '@square/orbit/components/Hovertip';
import { OHeading } from '@square/orbit/components/Heading';
import { OButton } from '@square/orbit/components/Button';
import { OPopover } from '@square/orbit/components/Popover';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		OHeading,
		OPopover,
		OButton,
		OIcon,
	},

	directives: {
		Hovertip: OHovertip,
	},

	data() {
		return {
			count: 0,
		};
	},

	mounted() {
		setInterval(() => {
			this.count += 1;
		}, 1000);
	},
};
</script>

<style scoped>
.demo {
	margin: 16px;
	border: 1px solid #ccc;
}
</style>

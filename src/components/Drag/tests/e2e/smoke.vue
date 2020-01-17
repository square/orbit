<template>
	<div>
		<o-drag
			v-model="satellites"
		>
			<o-drag-item
				v-for="(item, index) in satellites"
				:key="index"
				:index="index"
				class="drag-item"
			>
				{{ item.name }}
				<template slot="handle">
					<o-icon
						class="handle"
						:name="item.icon"
					/>
					<o-icon
						class="hover-handle"
						name="drag-bars"
					/>
				</template>
			</o-drag-item>
		</o-drag>
	</div>
</template>

<script>
import { ODrag, ODragItem } from '@square/orbit/components/Drag';
import { OIcon } from '@square/orbit/components/Icon';

export default {
	components: {
		ODrag,
		ODragItem,
		OIcon,
	},
	data() {
		return {
			satellites: [
				{
					name: 'Sputnik 1',
					icon: 'alert-circle',
				},
				{
					name: 'Project SCORE',
					icon: 'bullet-points',
				},
				{
					name: 'TIROS-1',
					icon: 'file',
				},
				{
					name: 'Echo 1',
					icon: 'lock',
				},
			],
		};
	},
};
</script>

<style scoped>
.hover-handle {
	display: none;
}

.drag-item:hover .hover-handle {
	display: inline-block;
}

.drag-item:hover .handle {
	display: none;
}
</style>

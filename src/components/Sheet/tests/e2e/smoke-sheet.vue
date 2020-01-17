<template>
	<o-sheet
		class="my-sheet"
		title="Sheet Title"
		v-on="$listeners"
	>
		<template slot="actions">
			<o-popover>
				<template
					slot="action"
					slot-scope="popover"
				>
					<o-button
						variant="muted"
						@click="popover.toggle()"
					>
						<o-icon name="more" />
					</o-button>
				</template>
				<o-nav
					slot-scope="popover"
					variant="menu"
				>
					<o-nav-link @click="handleClick(popover, 'First Link')">
						First Link
					</o-nav-link>
					<o-nav-link @click="handleClick(popover, 'Second Link')">
						Second Link
					</o-nav-link>
					<o-nav-link @click="handleClick(popover, 'Third Link')">
						Third Link
					</o-nav-link>
					<o-nav-link @click="handleClick(popover, 'Fourth Link')">
						Fourth Link
					</o-nav-link>
				</o-nav>
			</o-popover>
			<o-schooltip
				:active-tip="currentTip"
				tip-id="header"
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
						@click.prevent="closeTip()"
					>
						No thanks, maybe later
					</a>
					<o-button
						size="small"
						@click="closeTip()"
					>
						Confirm
					</o-button>
				</div>
				<o-button @click="openTip('header')">
					Schooltip
				</o-button>
			</o-schooltip>
			<o-button variant="primary">
				Save
			</o-button>
		</template>
		<o-schooltip
			:active-tip="currentTip"
			tip-id="content"
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
					@click.prevent="closeTip()"
				>
					No thanks, maybe later
				</a>
				<o-button
					size="small"
					@click="closeTip()"
				>
					Confirm
				</o-button>
			</div>
			<o-button @click="openTip('content')">
				Schooltip
			</o-button>
		</o-schooltip>
		<o-popover>
			<template
				slot="action"
				slot-scope="popover"
			>
				<o-button
					variant="muted"
					@click="popover.toggle()"
				>
					<o-icon name="more" />
				</o-button>
			</template>
			<o-nav
				slot-scope="popover"
				variant="menu"
			>
				<o-nav-link @click="handleClick(popover, 'First Link')">
					First Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Second Link')">
					Second Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Third Link')">
					Third Link
				</o-nav-link>
				<o-nav-link @click="handleClick(popover, 'Fourth Link')">
					Fourth Link
				</o-nav-link>
			</o-nav>
		</o-popover>
		<p
			v-for="i in 10"
			:key="i"
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum dapibus risus,
			in vestibulum sem interdum sit amet. Morbi nec lorem volutpat ligula hendrerit facilisis.
			Etiam ex magna, sagittis eget lobortis quis, aliquet id dolor. Vivamus sit amet egestas
			tellus. Suspendisse purus orci, feugiat in dapibus vel, consectetur in felis. Nam in ante
			eu massa pulvinar auctor. Nulla interdum ex non sapien semper, sit amet aliquam neque
			maximus. Maecenas eu felis in purus mattis sagittis nec ut arcu. Morbi at accumsan augue.
			Pellentesque et mauris vehicula, luctus odio ac, congue enim. Donec sem risus, pulvinar
			eu finibus a, varius et nisl. Sed ultricies bibendum odio eget gravida. Vivamus at aliquam
			dui.
		</p>
	</o-sheet>
</template>

<script>
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { ONav, ONavLink } from '@square/orbit/components/Nav';
import { OPopover } from '@square/orbit/components/Popover';
import { OSchooltip } from '@square/orbit/components/Schooltip';
import { OSheet } from '@square/orbit/components/Sheet';

export default {
	components: {
		OButton,
		OIcon,
		ONav,
		ONavLink,
		OPopover,
		OSchooltip,
		OSheet,
	},
	data() {
		return {
			currentTip: null,
		};
	},
	methods: {
		openTip(tip) {
			this.currentTip = tip;
		},
		closeTip() {
			this.currentTip = null;
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
	justify-content: space-between;
	align-items: center;
}
</style>

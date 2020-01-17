<template>
	<div>
		<h1>Layout Header</h1>
		<o-layout>
			<o-layout-header
				class="highlight"
				centered
			>
				<template slot="back-action">
					<o-button variant="muted">
						<o-icon name="arrow-left" />
						Back
					</o-button>
				</template>
				<o-heading
					size="title-2"
					flush
				>
					Centered Layout Header
				</o-heading>
				<template slot="actions">
					<o-button variant="secondary">
						Secondary
					</o-button>
					<o-button variant="primary">
						Primary
					</o-button>
				</template>
			</o-layout-header>

			<o-layout-header
				class="highlight"
				centered
			>
				<o-heading
					size="title-2"
					flush
				>
					Centered Layout Header w/ Actions
				</o-heading>
				<template slot="actions">
					<o-button variant="secondary">
						Secondary
					</o-button>
					<o-button variant="primary">
						Primary
					</o-button>
				</template>
			</o-layout-header>

			<o-layout-header
				class="highlight"
				centered
			>
				<template slot="back-action">
					<o-button variant="muted">
						<o-icon name="arrow-left" />
						Back
					</o-button>
				</template>
				<o-heading
					size="title-2"
					flush
				>
					Centered Layout Header w/Back Action
				</o-heading>
			</o-layout-header>

			<o-layout-header
				class="highlight"
				centered
			>
				<o-heading
					size="title-2"
					flush
				>
					Centered Layout Header
				</o-heading>
			</o-layout-header>

			<o-layout-header class="highlight">
				<template slot="back-action">
					<o-button variant="muted">
						<o-icon name="arrow-left" />
						Back
					</o-button>
				</template>
				<o-heading
					size="title-2"
					flush
				>
					Layout Header
				</o-heading>
				<template slot="actions">
					<o-button variant="secondary">
						Secondary
					</o-button>
					<o-button variant="primary">
						Primary
					</o-button>
				</template>
			</o-layout-header>

			<o-layout-header class="highlight">
				<o-heading
					size="title-2"
					flush
				>
					Layout Header w/ Actions
				</o-heading>
				<template slot="actions">
					<o-button variant="secondary">
						Secondary
					</o-button>
					<o-button variant="primary">
						Primary
					</o-button>
				</template>
			</o-layout-header>

			<o-layout-header class="highlight">
				<template slot="back-action">
					<o-button variant="muted">
						<o-icon name="arrow-left" />
						Back
					</o-button>
				</template>
				<o-heading
					size="title-2"
					flush
				>
					Layout Header w/Back Action
				</o-heading>
			</o-layout-header>

			<o-layout-header class="highlight">
				<o-heading
					size="title-2"
					flush
				>
					Layout Header
				</o-heading>
			</o-layout-header>
		</o-layout>
		<h1>Layout Layering with Popover/Schooltip</h1>
		<o-layout
			:class="$s.overflow"
			has-layers
		>
			<o-layout-header
				sticky
				:class="$s.Header"
			>
				<o-popover
					placement="bottom-end"
				>
					<template
						slot="action"
						slot-scope="popover"
					>
						<o-button @click="popover.toggle()">
							Open Popover In Header
						</o-button>
					</template>
					Popover content
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
					<div slot="action">
						<o-button @click="toggleTip">
							Toggle Tip
						</o-button>
					</div>

					<o-button @click="toggleTip">
						Toggle Tip
					</o-button>
				</o-schooltip>
			</o-layout-header>
			<o-layout-content :class="$s.Content">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
				<o-popover
					placement="bottom-end"
				>
					<template
						slot="action"
						slot-scope="popover"
					>
						<o-button @click="popover.toggle()">
							Open Popover In Content
						</o-button>
					</template>
					Popover content
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
					<div slot="action">
						<o-button @click="toggleTip">
							Toggle Tip
						</o-button>
					</div>

					<o-button @click="toggleTip">
						Toggle Tip
					</o-button>
				</o-schooltip>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sit amet sagittis dui, a efficitur purus. In fringilla
				felis eget scelerisque efficitur. Donec metus sem, placerat in
				lorem et, vehicula consequat velit. Phasellus porttitor ligula at
				posuere lacinia. Aenean ac tristique orci, eget fermentum lorem.
				Mauris dignissim lorem ultricies, vehicula ligula ut, porta arcu.
				Aliquam cursus, dui sed finibus maximus, magna felis ultricies odio,
				sit amet elementum purus felis rhoncus nulla. Pellentesque tempor massa
				nec nibh elementum, rutrum tempor dolor cursus. Proin nec sapien
				in justo imperdiet tincidunt. Pellentesque habitant morbi tristique
				senectus et netus et malesuada fames ac turpis egestas.
				Nulla vestibulum enim at nisi cursus ultricies.
			</o-layout-content>
		</o-layout>
	</div>
</template>

<script>
import { OLayout, OLayoutHeader, OLayoutContent } from '@square/orbit/components/Layout';
import { OHeading } from '@square/orbit/components/Heading';
import { OButton } from '@square/orbit/components/Button';
import { OIcon } from '@square/orbit/components/Icon';
import { OPopover } from '@square/orbit/components/Popover';
import { OSchooltip } from '@square/orbit/components/Schooltip';


export default {
	components: {
		OLayout,
		OLayoutHeader,
		OLayoutContent,
		OHeading,
		OButton,
		OIcon,
		OPopover,
		OSchooltip,
	},
	data() {
		return {
			currentTip: null,
		};
	},
	methods: {
		toggleTip() {
			this.currentTip = (this.currentTip === 0) ? null : 0;
		},
	},
};
</script>

<style scoped>
.highlight {
	border: 1px dashed pink;
}

.highlight + .highlight {
	margin-top: 16px;
}
.minHeight {
	min-height: 128px;
}
</style>

<style module="$s">
body {
    margin: 0;
}

.Content {
    height: 5000px;
}

.Header {
    background: white;
    border-bottom: 1px solid gray;
}

.overflow {
	height: 250px;
	overflow: auto;
}
</style>

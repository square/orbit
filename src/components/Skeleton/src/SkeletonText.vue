<script>
import SkeletonBlock from './SkeletonBlock.vue';

export default {
	name: 'OSkeletonText',

	functional: true,

	components: {
		SkeletonBlock,
	},

	props: {
		lines: {
			type: Number,
			default: 1,
		},
		theme: {
			type: String,
			default: 'dark',
			validator: value => ['dark', 'light'].includes(value),
		},
		variant: {
			type: String,
			default: 'text',
			validator: value => ['text', 'title', 'subtitle'].includes(value),
		},
	},

	render(h, { $s, props, data }) {
		const lines = Array(props.lines).fill().map((_, key) => (
			<SkeletonBlock
				key={key}
				class={[$s.SkeletonTextItem, $s[`variant_${props.variant}`]]}
				theme={props.theme}
			/>
		));

		return (
			<div
				class={$s.SkeletonText}
				{...data}
			>
				{lines}
			</div>
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.SkeletonTextItem {
	margin-bottom: var(--space);

	&:last-child:not(:only-child) {
		width: 66%;
	}
}

.variant_text {
	height: var(--font-size-base);

	&:last-child {
		margin-bottom: 0;
	}
}

.variant_title {
	height: var(--space-x4);
	margin-bottom: var(--space-x3);

	&:only-child {
		width: 196px;
	}
}

.variant_subtitle {
	height: var(--space-x3);

	&:only-child {
		width: 240px;
	}
}
</style>

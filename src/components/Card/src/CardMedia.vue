<template>
	<div
		:class="[
			$s.CardMedia,
			{
				[$s.cover]: cover,
				[$s.last]: isLastElement,
				[$s.hovering]: card.hovering,
			},
		]"
	>
		<img
			v-show="!loading"
			:src="src"
			:alt="alt"
			:class="[
				$s.Media,
				{ [$s.cover]: cover, },
			]"
		>
		<o-skeleton-media
			v-show="loading"
			ratio="3:2"
		/>
	</div>
</template>

<script>
import { OSkeletonMedia } from '@square/orbit/components/Skeleton';
import CardKey from './CardKey';

export default {
	name: 'OCardMedia',

	components: {
		OSkeletonMedia,
	},

	props: {
		src: {
			type: String,
			default: undefined,
		},
		alt: {
			type: String,
			default: undefined,
		},
		cover: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},

	inject: {
		card: CardKey,
	},

	computed: {
		isLastElement() {
			return this.card.lastElement && this.card.lastElement.componentInstance === this;
		},
	},

	watch: {
		src: 'preloadImage',
	},

	mounted() {
		this.preloadImage();
	},

	methods: {
		preloadImage() {
			if (!this.loading) {
				return;
			}

			const objImg = new Image();
			objImg.addEventListener('load', () => this.$emit('load'));
			objImg.src = this.src;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-card.css";

:root {
	--media-padding: calc(-1 * var(--card-padding));
}

.CardMedia {
	display: block;
	margin-bottom: var(--card-padding);
	line-height: 0;

	&.cover {
		position: relative;
		width: calc(100% + (2 * var(--card-padding)));
		margin-top: var(--media-padding);
		margin-right: var(--media-padding);
		margin-left: var(--media-padding);

		&::before {
			position: absolute;
			width: 100%;
			height: 100%;
			transition: background-color var(--transition-base);
			background: transparent;
			content: "";
		}

		&.hovering::before {
			background-color: color(var(--color-gray-60) a(0.1));
		}

		&.last {
			margin-bottom: var(--media-padding);
		}
	}
}

.Media {
	&:not(.cover) {
		max-width: 100%;
	}

	&.cover {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

* ~ .CardMedia {
	margin-top: var(--card-padding);

	&.cover {
		margin-top: var(--card-padding);
	}
}
</style>

<template>
	<div
		:class="[
			$s.GridItem,
			$s[`gutter_${grid.gutter}`],
			{
				[$s[`span_${span}`]]: span,
				[$s[`tablet-portrait_${tabletPortrait}`]]: tabletPortrait,
				[$s[`tablet-landscape_${tabletLandscape}`]]: tabletLandscape,
				[$s[`desktop_${desktop}`]]: desktop,
				[$s[`big-desktop_${bigDesktop}`]]: bigDesktop,
			},
		]"
	>
		<slot />
	</div>
</template>

<script>
import Key from './Key';

export default {
	name: 'OGridItem',

	inject: {
		grid: Key,
	},

	props: {
		span: {
			type: [Number, String],
			default() {
				return Math.ceil(12 / this.grid.numGridItems);
			},
		},
		tabletPortrait: {
			type: [Number, String],
			default: undefined,
		},
		tabletLandscape: {
			type: [Number, String],
			default: undefined,
		},
		desktop: {
			type: [Number, String],
			default: undefined,
		},
		bigDesktop: {
			type: [Number, String],
			default: undefined,
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-grid.css";

.GridItem {
	max-width: 100%;
	box-sizing: border-box;

	/* Columns */
	&.span_1 {
		width: calc(1 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 1;
		}
	}

	&.span_2 {
		width: calc(2 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 2;
		}
	}

	&.span_3 {
		width: calc(3 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 3;
		}
	}

	&.span_4 {
		width: calc(4 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 4;
		}
	}

	&.span_5 {
		width: calc(5 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 5;
		}
	}

	&.span_6 {
		width: calc(6 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 6;
		}
	}

	&.span_7 {
		width: calc(7 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 7;
		}
	}

	&.span_8 {
		width: calc(8 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 8;
		}
	}

	&.span_9 {
		width: calc(9 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 9;
		}
	}

	&.span_10 {
		width: calc(10 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 10;
		}
	}

	&.span_11 {
		width: calc(11 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 11;
		}
	}

	&.span_12 {
		width: calc(12 / 12 * 100%);

		@supports (display: grid) {
			grid-column: span 12;
		}
	}

	@supports not (display: grid) {
		&.gutter_medium {
			padding: 0 calc(var(--grid-gutter) / 2) var(--grid-gutter);
		}

		&.gutter_small {
			padding: 0 calc(var(--grid-gutter-small) / 2) var(--grid-gutter-small);
		}
	}

	@media (--for-tablet-portrait-up) {
		&.tablet-portrait_1 {
			width: calc(1 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 1;
			}
		}

		&.tablet-portrait_2 {
			width: calc(2 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 2;
			}
		}

		&.tablet-portrait_3 {
			width: calc(3 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 3;
			}
		}

		&.tablet-portrait_4 {
			width: calc(4 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 4;
			}
		}

		&.tablet-portrait_5 {
			width: calc(5 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 5;
			}
		}

		&.tablet-portrait_6 {
			width: calc(6 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 6;
			}
		}

		&.tablet-portrait_7 {
			width: calc(7 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 7;
			}
		}

		&.tablet-portrait_8 {
			width: calc(8 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 8;
			}
		}

		&.tablet-portrait_9 {
			width: calc(9 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 9;
			}
		}

		&.tablet-portrait_10 {
			width: calc(10 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 10;
			}
		}

		&.tablet-portrait_11 {
			width: calc(11 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 11;
			}
		}

		&.tablet-portrait_12 {
			width: calc(12 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 12;
			}
		}
	}

	@media (--for-tablet-landscape-up) {
		&.tablet-landscape_1 {
			width: calc(1 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 1;
			}
		}

		&.tablet-landscape_2 {
			width: calc(2 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 2;
			}
		}

		&.tablet-landscape_3 {
			width: calc(3 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 3;
			}
		}

		&.tablet-landscape_4 {
			width: calc(4 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 4;
			}
		}

		&.tablet-landscape_5 {
			width: calc(5 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 5;
			}
		}

		&.tablet-landscape_6 {
			width: calc(6 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 6;
			}
		}

		&.tablet-landscape_7 {
			width: calc(7 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 7;
			}
		}

		&.tablet-landscape_8 {
			width: calc(8 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 8;
			}
		}

		&.tablet-landscape_9 {
			width: calc(9 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 9;
			}
		}

		&.tablet-landscape_10 {
			width: calc(10 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 10;
			}
		}

		&.tablet-landscape_11 {
			width: calc(11 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 11;
			}
		}

		&.tablet-landscape_12 {
			width: calc(12 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 12;
			}
		}
	}

	@media (--for-desktop-up) {
		&.desktop_1 {
			width: calc(1 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 1;
			}
		}

		&.desktop_2 {
			width: calc(2 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 2;
			}
		}

		&.desktop_3 {
			width: calc(3 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 3;
			}
		}

		&.desktop_4 {
			width: calc(4 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 4;
			}
		}

		&.desktop_5 {
			width: calc(5 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 5;
			}
		}

		&.desktop_6 {
			width: calc(6 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 6;
			}
		}

		&.desktop_7 {
			width: calc(7 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 7;
			}
		}

		&.desktop_8 {
			width: calc(8 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 8;
			}
		}

		&.desktop_9 {
			width: calc(9 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 9;
			}
		}

		&.desktop_10 {
			width: calc(10 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 10;
			}
		}

		&.desktop_11 {
			width: calc(11 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 11;
			}
		}

		&.desktop_12 {
			width: calc(12 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 12;
			}
		}
	}

	@media (--for-big-desktop-up) {
		&.big-desktop_1 {
			width: calc(1 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 1;
			}
		}

		&.big-desktop_2 {
			width: calc(2 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 2;
			}
		}

		&.big-desktop_3 {
			width: calc(3 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 3;
			}
		}

		&.big-desktop_4 {
			width: calc(4 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 4;
			}
		}

		&.big-desktop_5 {
			width: calc(5 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 5;
			}
		}

		&.big-desktop_6 {
			width: calc(6 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 6;
			}
		}

		&.big-desktop_7 {
			width: calc(7 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 7;
			}
		}

		&.big-desktop_8 {
			width: calc(8 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 8;
			}
		}

		&.big-desktop_9 {
			width: calc(9 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 9;
			}
		}

		&.big-desktop_10 {
			width: calc(10 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 10;
			}
		}

		&.big-desktop_11 {
			width: calc(11 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 11;
			}
		}

		&.big-desktop_12 {
			width: calc(12 / 12 * 100%);

			@supports (display: grid) {
				grid-column: span 12;
			}
		}
	}

	@supports (display: grid) {
		width: auto !important;
	}
}
</style>

<script>
import NoClickFocus from '@square/orbit/utils/NoClickFocus.vue';

export default {
	name: 'OTabControl',

	components: {
		NoClickFocus,
	},

	props: {
		active: {
			type: Boolean,
			default: false,
		},
		align: {
			type: String,
			default: undefined,
		},
		labelNode: {
			type: null,
			default: undefined,
		},
		position: {
			type: String,
			default: undefined,
		},
	},

	render() {
		const { $s } = this;
		return (
			<a
				class={[
					$s.TabControl,
					$s[`align_${this.align}`],
					$s[`position_${this.position}`],
					{ [$s.active]: this.active },
				]}
				{...{ on: this.$listeners }}
				tabindex="0"
			>
				<no-click-focus class={$s.InnerTab}>{this.labelNode}</no-click-focus>
			</a>
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.InnerTab {
	display: flex;
	align-items: center;
}

.TabControl {
	display: inline-flex;
	align-items: center;
	transition: color var(--transition-base);
	outline: none;
	color: var(--color-gray-50);
	font-weight: var(--font-weight-medium);
	line-height: 24px;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		color: var(--brand-color);
	}

	&.active {
		color: var(--brand-color);
	}

	&.position_top {
		& .InnerTab {
			padding: var(--space-x2);
		}
	}

	&.position_left {
		display: block;

		& .InnerTab {
			padding: var(--space) var(--space-x2) var(--space) 0;
		}

		&.align_center .InnerTab {
			justify-content: center;
			padding: var(--space);
			text-align: center;
		}

		&.align_right .InnerTab {
			justify-content: flex-end;
			text-align: right;
		}
	}

	&.position_top.align_stretch,
	&.position_top.align_stretch .InnerTab {
		flex: 1;
		justify-content: center;
	}
}
</style>

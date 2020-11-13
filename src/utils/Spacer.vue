<script>
/*
	Handles horizontal spacing for inline elements that are passed-in in groups (slots/components).

	Use-cases:
	- Icons in the Button component
	  - eg. <o-button>Text <o-icon /> Text</o-button>
	- Buttons in an action slot
	  - eg.
		<template slot="actions">
			<o-button>Text</o-button>
			<o-button>Text</o-button>
			<o-button>Text</o-button>
		</template>
*/

export default {
	name: 'Spacer',

	functional: true,

	props: {
		size: {
			type: String,
			default: '',
			validator: (size) => ['', 'x2'].includes(size),
		},
	},

	render(h, ctx) {
		const children = ctx.slots().default;

		if (!children) {
			return children;
		}

		const childrenLen = children.length;

		if (childrenLen === 1) {
			return children;
		}

		const { size } = ctx.props;
		let {
			'margin-left': marginLeft,
			'margin-right': marginRight,
		} = ctx.$s;

		if (size) {
			marginLeft = `${marginLeft} ${ctx.$s[size]}`;
			marginRight = `${marginRight} ${ctx.$s[size]}`;
		}

		return children
			.map((child, idx) => {
				const childNode = child;

				if (!childNode.tag) {
					childNode.text = childNode.text.trim();
				}

				if (childNode.componentOptions) {
					const { staticClass = '' } = childNode.data;

					if (idx === 0) {
						childNode.data.staticClass = `${staticClass} ${marginRight}`;
					} else if (idx === (childrenLen - 1)) {
						childNode.data.staticClass = `${staticClass} ${marginLeft}`;
					} else {
						childNode.data.staticClass = `${staticClass} ${marginLeft} ${marginRight}`;
					}
				}

				return childNode;
			});
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.margin-left {
	margin-left: var(--space);

	&.x2 {
		margin-left: var(--space-x2);
	}
}

.margin-right {
	margin-right: var(--space);

	&.x2 {
		margin-right: var(--space-x2);
	}
}

.margin-right + .margin-left {
	margin-left: 0;
}
</style>

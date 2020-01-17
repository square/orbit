function removeEmptyTextnodes(vnodes) {
	return vnodes.filter(vnode => vnode.tag || !vnode.text.match(/^\s*$/));
}

function removeWhitespace(vnodes) {
	return removeEmptyTextnodes(vnodes)
		.map((vnode) => {
			if (vnode.text) {
				vnode.text = vnode.text.trim();
			}
			return vnode;
		});
}

function vnodeMatchesComponent(vnode, componentConst) {
	if (!vnode.componentOptions) {
		return false;
	}
	const vnodeComponent = vnode.componentOptions.Ctor.extendOptions;
	if (!Array.isArray(componentConst)) {
		return vnodeComponent === componentConst;
	}
	return componentConst.includes(vnodeComponent);
}

function enforceComponent(vnodes, componentConst) {
	return vnodes
		.filter(vnode => vnodeMatchesComponent(vnode, componentConst));
}

function emit(ctx, eventName, ...args) {
	const eventHandler = ctx.listeners[eventName];
	if (typeof eventHandler === 'function') {
		eventHandler(...args);
	}
}

export default {
	name: 'VnodeFilter',

	functional: true,

	props: {
		enforceComponent: {
			type: [Object, Array],
			default: null,
		},
		removeWhitespace: {
			type: Boolean,
			default: true,
		},
		mapFn: {
			type: Function,
			default: null,
		},
	},

	render(h, ctx) {
		const { slots, props } = ctx;
		let { default: defaultSlot } = slots();

		if (props.removeWhitespace) {
			defaultSlot = removeWhitespace(defaultSlot);
		}

		if (props.enforceComponent) {
			defaultSlot = removeEmptyTextnodes(defaultSlot);

			const filtered = enforceComponent(defaultSlot, props.enforceComponent);

			if (filtered.length !== defaultSlot.length) {
				emit(ctx, 'componentMismatch');
			}

			defaultSlot = filtered;
		}

		if (props.mapFn) {
			defaultSlot = defaultSlot.map(props.mapFn);
		}

		emit(ctx, 'completed', defaultSlot);

		return defaultSlot;
	},
};

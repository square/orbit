<script>
const externalLinkPtrn = /^(https?:)?\/\//i;
const isExternalLink = (url) => (typeof url === 'string' && externalLinkPtrn.test(url));
const hasRoute = (router, href) => {
	if (!router) { return false; }
	const resolved = router.resolve(href);
	return (resolved.resolved.matched.length > 0);
};

export default {
	name: 'SmartLink',

	functional: true,

	props: {
		href: {
			type: [String, Object],
			default: undefined,
		},
	},

	render(h, ctx) {
		const {
			props,
			data,
			parent,
			children,
		} = ctx;
		const { href } = props;
		const RouterLink = parent.$options.components['router-link'] || parent.$options.components.RouterLink;

		if (
			RouterLink && href && (
				(href instanceof Object) || (hasRoute(parent.$router, href) && !isExternalLink(href))
			)
		) {
			return (
				<RouterLink
					to={href}
					{...data}
				>
					{children}
				</RouterLink>
			);
		}

		if (href) {
			return (
				<a
					href={href}
					{...data}
				>
					{children}
				</a>
			);
		}

		if (ctx.listeners.click) {
			return (
				<button
					type="button"
					{...data}
				>
					{children}
				</button>
			);
		}

		return (
			<span {...data}>
				{children}
			</span>
		);
	},
};
</script>

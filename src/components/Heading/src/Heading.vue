<script>
export default {
	name: 'OHeading',

	props: {
		element: {
			type: String,
			default: 'div',
			validator: element => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'].includes(element),
		},
		flush: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: 'title-1',
			validator: size => ['display-1', 'display-2', 'display-3', 'title-1', 'title-2', 'title-3', 'title-4', 'title-5'].includes(size),
		},
	},

	render(createElement) {
		return createElement(
			this.element,
			{
				class: [
					this.$s.Heading,
					this.$s[`size_${this.size}`],
					{
						[this.$s.flush]: this.flush,
					},
				],
			},
			this.$slots.default,
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";
@import "@square/orbit/styles/vars-heading.css";

.Heading {
	margin-top: 0;
	color: var(--heading-color);
}

.size_display-1 {
	composes: display-1 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 1rem;
	}
}

.size_display-2 {
	composes: display-2 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 1rem;
	}
}

.size_display-3 {
	composes: display-3 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 0.5rem;
	}
}

.size_title-1 {
	composes: title-1 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 0.5rem;
	}
}

.size_title-2 {
	composes: title-2 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 0.5rem;
	}
}

.size_title-3 {
	composes: title-3 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 0.5rem;
	}
}

.size_title-4 {
	composes: title-4 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 0.5rem;
	}
}

.size_title-5 {
	composes: title-5 from "@square/orbit/styles/headings.css";

	&:not(.flush) {
		margin-bottom: 0.5rem;
	}
}
</style>

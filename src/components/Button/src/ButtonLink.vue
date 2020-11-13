<script>
import SmartLink from '@square/orbit/utils/SmartLink.vue';
import mergeWith from 'lodash/mergeWith';

const mergeData = (className, data) => mergeWith(
	{ class: [className] },
	data,
	(val, srcVal) => (Array.isArray(val) ? val.concat(srcVal) : undefined),
);

export default {
	name: 'ButtonLink',

	functional: true,

	render(h, ctx) {
		const { $s, data } = ctx;
		const isButtonVisible = !data.attrs.href || data.attrs.disabled;

		const { 'wrapper-class': wrapperClass } = data.attrs;
		data.attrs['wrapper-class'] = null;

		return (
			<div class={[$s.ButtonWrap, wrapperClass]}>
				<button {...mergeData($s.ButtonEl, data)}>
					{ ctx.children }
				</button>
				{
					!isButtonVisible && (
						<SmartLink {...mergeData($s.Anchor, data)}>
							{ ctx.children }
						</SmartLink>
					)
				}
			</div>
		);
	},
};
</script>

<style module="$s">
.ButtonWrap {
	display: inline-block;
}

.Anchor {
	display: inline-block;
}

.ButtonEl {
	display: none;

	&:last-child,
	&:disabled {
		display: inline-block;
	}

	&:disabled + .Anchor {
		display: none;
	}
}

</style>

<script>
import SkeletonBlock from './SkeletonBlock.vue';

export default {
	name: 'OSkeletonImg',

	functional: true,

	components: {
		SkeletonBlock,
	},

	props: {
		ratio: {
			type: String,
			default: '1:1',
			validator: value => ['1:1', '3:2', '4:3', '5:3', '16:9'].includes(value),
		},
		theme: {
			type: String,
			default: 'dark',
			validator: value => ['dark', 'light'].includes(value),
		},
	},

	render(h, { $s, props, data }) {
		const ratioClass = props.ratio.replace(':', '-');
		return (
			<SkeletonBlock
				class={[$s.SkeletonImg, $s[`ratio_${ratioClass}`]]}
				theme={props.theme}
				{...data}
			/>
		);
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

/* Ratio
-------------------- */
.ratio_1-1 {
	padding-bottom: 100%;
}

.ratio_3-2 {
	padding-bottom: 66.667%;
}

.ratio_4-3 {
	padding-bottom: 75%;
}

.ratio_5-3 {
	padding-bottom: 60%;
}

.ratio_16-9 {
	padding-bottom: 56.25%;
}
</style>

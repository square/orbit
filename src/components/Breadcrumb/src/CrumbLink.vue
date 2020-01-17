<script>
import SmartLink from '@square/orbit/utils/SmartLink.vue';

export default {
	name: 'CrumbLink',

	props: {
		to: {
			type: [String, Object],
			default: undefined,
		},
	},

	render() {
		if (this.to) {
			return (
				<SmartLink href={this.to}>
					{this.$slots.default}
				</SmartLink>
			);
		}

		return (
			<span>
				{this.$slots.default}
			</span>
		);
	},
};
</script>

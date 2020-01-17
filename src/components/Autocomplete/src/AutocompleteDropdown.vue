<script>
import AutocompleteKey from './AutocompleteKey';

export default {
	name: 'AutocompleteDropdown',

	props: {
		api: {
			type: Object,
			required: true,
		},
	},

	provide() {
		return { [AutocompleteKey]: this.api };
	},

	render() {
		return (<div>{this.$slots.default}</div>);
	},
};
</script>

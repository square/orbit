import { assert } from '@square/orbit/utils/debug';
import SchooltipSequenceKey from './SchooltipSequenceKey';

// @vue/component
const Provider = {
	provide() {
		const vm = this;
		return {
			[SchooltipSequenceKey]: {
				get $attrs() {
					return vm.$attrs;
				},
			},
		};
	},
	render() {
		return this.$slots.default.filter((vnode) => vnode.tag)[0];
	},
};

function Sequence({
	name = 'UnnamedSequence',
	tips,
	getTip,
	setTip,
}) {
	assert.error(
		Array.isArray(tips) && tips.length > 0,
		'Schooltip Sequence', `You must pass in at least one Schooltip in sequence "${name}"`,
	);

	// @vue/component
	return {
		name: `OSequence-${name}`,

		model: {
			prop: 'activeTip',
			event: 'set-tip',
		},

		props: {
			tip: {
				type: [String, Number],
				required: true,
				validator(n) {
					assert.error(
						!Number.isNaN(parseInt(n, 10)),
						'Schooltip Sequence', `Tip ${n} is not a valid tip in sequence "${name}"`,
					);

					assert.error(
						tips[n - 1],
						'Schooltip Sequence', `Couldn't find tip ${n} in sequence "${name}"`,
					);

					return true;
				},
			},
			activeTip: {
				type: [String, Number],
				default: undefined,
				validator() {
					assert.error(
						typeof getTip !== 'function' && typeof setTip !== 'function',
						'Schooltip Sequence', `You have already passed in a state in the Sequence for "${name}"`,
					);

					return true;
				},
			},
		},

		data() {
			return {
				key: Symbol(name + this.tip),
			};
		},

		computed: {
			getTip: getTip || function getter() {
				return this.activeTip;
			},
		},

		methods: {
			setTip: setTip || function setter(newTipId) {
				this.$emit('set-tip', newTipId);
			},
			nextTip() {
				this.setTip(this.getTip + 1);
			},
			prevTip() {
				this.setTip(this.getTip - 1);
			},
			closeSequence() {
				this.setTip(null);
			},
		},

		render() {
			let defaultSlot = this.$scopedSlots.default || this.$slots.default;

			if (typeof defaultSlot === 'function') {
				defaultSlot = defaultSlot({
					nextTip: this.nextTip,
					prevTip: this.prevTip,
					closeSequence: this.closeSequence,
				});
			}

			let { tip: tipIdx } = this;
			tipIdx = parseInt(tipIdx, 10);

			const TipComponent = tips[tipIdx - 1];

			return (
				<Provider
					tipId={tipIdx}
					activeTip={this.getTip}
				>
					<TipComponent
						key={this.key}
						{...{
							on: {
								'next-tip': this.nextTip,
								'prev-tip': this.prevTip,
								'close-sequence': this.closeSequence,
							},
						}}
					>
					{ defaultSlot }
					</TipComponent>
				</Provider>
			);
		},
	};
}

export default Sequence;

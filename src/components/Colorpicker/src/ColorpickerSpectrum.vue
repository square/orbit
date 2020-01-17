<template>
	<div>
		<div
			ref="spectrum"
			:class="$s.ColorpickerSpectrum"
			:style="spectrumStyles"
		>
			<div :class="$s.Lightness" />
			<div :class="$s.Darkness" />
			<div
				:class="$s.Container"
				@mousedown="dragListener"
			/>

			<div
				:class="$s.Indicator"
				:style="indictorStyles"
			>
				<div :class="$s.Draghandle" />
			</div>
		</div>

		<o-slider
			v-model="hsv.h"
			:max="360"
			theme="hue"
		/>
	</div>
</template>

<script>
import { OSlider } from '@square/orbit/components/Slider';
import tinycolor from 'tinycolor2';

function isSameHex(hsv1, hsv2) {
	return tinycolor(hsv1).toHex() === tinycolor(hsv2).toHex();
}


export default {
	name: 'OColorpickerSpectrum',

	components: {
		OSlider,
	},

	model: {
		prop: 'color',
		event: 'colorpicker-spectrum:update',
	},

	props: {
		color: {
			type: String,
			default: undefined,
		},
	},

	data() {
		const vm = this;
		return {
			hsv_: tinycolor(this.color).toHsv(),
			hsv: {
				get h() {
					return vm.hsv_.h;
				},
				set h(h) {
					vm.hsv_.h = h;
				},

				get s() {
					return vm.hsv_.s;
				},
				set s(s) {
					vm.hsv_.s = s;
				},

				get v() {
					return vm.hsv_.v;
				},
				set v(v) {
					vm.hsv_.v = v;
				},
			},

			spectrumPosition: {
				x: null,
				y: null,
				width: null,
				height: null,
			},
		};
	},

	computed: {
		spectrumStyles() {
			return {
				backgroundColor: tinycolor({ h: this.hsv.h, s: 1, v: 1 }).toHexString(),
			};
		},

		indictorStyles() {
			const { width, height } = this.spectrumPosition;
			const relativeTop = (height - (this.hsv.v * height)) / height * 100;
			const relativeLeft = (this.hsv.s * width) / width * 100;
			return {
				top: `${relativeTop}%`,
				left: `${relativeLeft}%`,
			};
		},
	},

	watch: {
		color() {
			const newHsv = tinycolor(this.color).toHsv();
			if (isSameHex(newHsv, this.hsv)) {
				newHsv.h = this.hsv.h;
			}
			this.hsv_ = newHsv;
		},

		hsv: {
			deep: true,
			handler() {
				const newHex = tinycolor(this.hsv).toHexString();
				this.$emit('colorpicker-spectrum:update', newHex);
			},
		},
	},

	mounted() {
		this.updateSpectrumPosition();
	},

	methods: {
		updateSpectrumPosition() {
			const { spectrum } = this.$refs;
			if (!spectrum) { return; }

			const {
				offsetWidth: width,
				offsetHeight: height,
			} = spectrum;
			const {
				left: x,
				top: y,
			} = spectrum.getBoundingClientRect();
			Object.assign(this.spectrumPosition, {
				x, y, width, height,
			});
		},

		dragListener(event) {
			this.updateSpectrumPosition();
			this.positionIndicator(event);
			document.addEventListener('mousemove', this.positionIndicator);
			document.addEventListener('mouseup', this.stopDrag);
		},

		stopDrag() {
			document.removeEventListener('mousemove', this.positionIndicator);
			document.removeEventListener('mouseup', this.stopDrag);
		},

		positionIndicator(event) {
			const {
				x,
				y,
				width,
				height,
			} = this.spectrumPosition;

			const indictorX = Math.max(
				0,
				Math.min(
					event.clientX - x,
					width,
				),
			);
			const indictorY = Math.max(
				0,
				Math.min(
					event.clientY - y,
					height,
				),
			);
			this.hsv.s = indictorX / width;
			this.hsv.v = (height - indictorY) / height;
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

.ColorpickerSpectrum {
	position: relative;
	width: 100%;
	height: 104px;
	margin-bottom: var(--space-x2);
	user-select: none;
}

.Container {
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.Lightness {
	background: linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
}

.Darkness {
	background: linear-gradient(to bottom, transparent 0%, #000 100%);
}

.Lightness,
.Darkness,
.Container {
	position: absolute;
	width: 100%;
	height: 100%;
}

.Indicator {
	position: absolute;
}

.Draghandle {
	position: absolute;
	top: -10px;
	left: -10px;
	width: 18px;
	height: 18px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 50%;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.4);
	pointer-events: none;
}
</style>

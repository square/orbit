<template>
	<div>
		<h2>RadioGroup-less Radios</h2>
		Selected value: <strong>{{ selectedRadio }}</strong>
		<o-toggle v-model="hasOptionE">
			{{ hasOptionE ? 'has option E' : 'no option E' }}
		</o-toggle>
		<o-toggle v-model="hasWhateva">
			{{ hasWhateva ? 'has whateva' : 'no whateva' }}
		</o-toggle>
		<o-toggle v-model="vertical">
			{{ vertical ? 'is vertical' : 'is horizontal' }}
		</o-toggle>
		<br>

		<div
			class="container"
			:style="containerStyles"
		>
			<o-radio
				v-model="selectedRadio"
				value="A"
				sublabel="This is Option A."
			>
				Option A
			</o-radio>
			<o-radio
				v-model="selectedRadio"
				value="B"
				sublabel="This is Option B."
			>
				Option B
			</o-radio>
			<div
				v-show="hasWhateva"
				class="whateva"
			>
				<em>whateva</em>
			</div>
			<o-radio
				v-model="selectedRadio"
				value="C"
				sublabel="This is Option C."
			>
				Option C
			</o-radio>
			<o-radio
				v-model="selectedRadio"
				value="D"
				disabled
				sublabel="This is Option D."
			>
				Option D
			</o-radio>
			<o-radio
				v-show="hasOptionE"
				v-model="selectedRadio"
				value="E"
				sublabel="This is Option E."
			>
				Option E
			</o-radio>
		</div>
	</div>
</template>

<script>
import { ORadio } from '@square/orbit/components/Radio';
import { OToggle } from '@square/orbit/components/Toggle';

export default {
	components: {
		OToggle,
		ORadio,
	},

	data() {
		return {
			selectedRadio: 'A',
			hasOptionE: false,
			vertical: true,
			hasWhateva: false,
		};
	},

	computed: {
		containerStyles() {
			return {
				flexDirection: this.vertical ? 'column' : 'row',
			};
		},
	},
};
</script>

<style scoped>
.container {
	display: flex;
	margin: 0 -4px -8px 0;
}

.container > * {
	margin: 0 4px 8px 0;
}

.whateva {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140px;
	height: 45px;
	background: #eee;
}
</style>

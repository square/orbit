<template>
	<div>
		<o-tabs>
			<o-tab-pane>
				<span slot="label">
					Hello
					<o-icon
						v-if="hasError"
						name="alert-circle"
					/>
				</span>
				hasError is {{ hasError }}
			</o-tab-pane>
			<o-tab-pane>
				<span slot="label">
					Howdy
					<o-icon
						v-if="hasError"
						name="alert-circle"
					/>
				</span>
				hasError is {{ hasError }}
			</o-tab-pane>
			<o-tab-pane>
				<span slot="label">
					Hey there
					<o-icon
						v-if="hasError"
						name="alert-circle"
					/>
				</span>
				hasError is {{ hasError }}
			</o-tab-pane>
		</o-tabs>
		<br>
		<o-button
			@click="toggleError"
		>
			click me to toggle hasError
		</o-button>
	</div>
</template>

<script>
import { OTabs, OTabPane } from '@square/orbit/components/Tabs';
import { OIcon } from '@square/orbit/components/Icon';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OTabs,
		OTabPane,
		OIcon,
		OButton,
	},
	data() {
		return {
			hasError: false,
		};
	},
	methods: {
		toggleError() {
			this.hasError = !this.hasError;
		},
	},
};
</script>

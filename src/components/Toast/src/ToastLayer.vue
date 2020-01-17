<template>
	<layer-transition :class="$s.ToastLayer">
		<template v-for="toastObj in toasts">
			<custom-toast
				v-if="toastObj.custom"
				:key="uniqueKey(toastObj)"
				:render-func="toastObj.toast"
				@toast:request-close="closeToast(toastObj)"
				@transitionend.native="detectClose($event, toastObj)"
			/>
			<o-toast
				v-else
				:key="uniqueKey(toastObj)"
				:variant="toastObj.toast.variant"
				:message="toastObj.toast.message"
				:action="toastObj.toast.action"
				:persistent="toastObj.toast.persistent"
				@toast:request-close="closeToast(toastObj)"
				@transitionend.native="detectClose($event, toastObj)"
			>
				{{ toastObj.toast.description }}
			</o-toast>
		</template>
	</layer-transition>
</template>
<script>
import { throwError } from '@square/orbit/utils/debug';
import { toastLayers } from './ToastLayers';
import LayerTransition from './LayerTransition.vue';
import OToast from './Toast.vue';
import CustomToast from './CustomToast';

export default {
	name: 'OToastLayer',

	components: {
		LayerTransition,
		CustomToast,
		OToast,
	},

	props: {
		id: {
			type: null,
			required: true,
		},
	},

	data() {
		return {
			keys: new Map(),
			toasts: [],
		};
	},

	mounted() {
		if (toastLayers.has(this.id)) {
			throwError('ToastLayer', 'Duplicate toast layers found');
		}

		toastLayers.set(this.id, {
			queueToast: toast => this.showToast(toast),
		});
	},

	methods: {
		uniqueKey(toastObj) {
			let key = this.keys.get(toastObj);
			if (!key) {
				key = Symbol('Toast');
				this.keys.set(toastObj, key);
			}
			return key;
		},

		// toast can be an object or function
		closeToast(toastObj) {
			const idx = this.toasts.indexOf(toastObj);
			if (idx > -1) {
				this.keys.delete(toastObj);
				this.toasts.splice(idx, 1);
			}

			return toastObj.closed;
		},

		showToast(toast, config = {}) {
			const toastObj = {
				custom: typeof toast === 'function',
				toast,
				config,
			};
			toastObj.closed = new Promise((markClosed) => {
				toastObj.markClosed = markClosed;
			});

			this.toasts.push(toastObj);

			return {
				close: () => this.closeToast(toastObj),
				closed: toastObj.closed,
			};
		},

		detectClose(e, toastObj) {
			if (e.propertyName !== 'opacity') { return; }
			toastObj.markClosed();
		},
	},
};
</script>

<style module="$s">
@import "@square/orbit/styles/vars.css";

:root {
	--toast-positioning: var(--space-x3);
}

.ToastLayer {
	position: fixed;
	right: var(--toast-positioning);
	bottom: var(--toast-positioning);
	width: calc(100% - var(--toast-positioning) * 2);
	max-width: 420px;
	z-index: 1;
}
</style>

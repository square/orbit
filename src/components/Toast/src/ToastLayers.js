import { throwError } from '@square/orbit/utils/debug';

const toastLayers = new Map();

function openInLayer(toastLayerId, toast) {
	const toastLayerInst = toastLayers.get(toastLayerId);

	if (!toastLayerInst) {
		throwError('ToastLayer', `ToastLayer with id "${toastLayerInst.toString()}" not found`);
	}

	return toastLayerInst.queueToast(toast);
}

export {
	toastLayers,
	openInLayer,
};

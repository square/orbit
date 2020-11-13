import { throwError } from '@square/orbit/utils/debug';

const layers = new Map();

function getLayer(layerId) {
	const layerInst = layers.get(layerId);

	if (!layerInst) {
		throwError('Layer', `Layer with id "${layerId.toString()}" not found. Please check that a parent of your view has an a mountable layer. See the Layout docs for more information.`);
	}

	return layerInst;
}

const API = {
	open(component, props) {
		const layerInst = getLayer(this.layerId);
		layerInst.mountComponent(component, props);
		return layerInst;
	},

	get isOpen() {
		const layerInst = getLayer(this.layerId);
		return layerInst.isOpen;
	},
};

export {
	layers,
	API,
};

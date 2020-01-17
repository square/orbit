import Popper from '_popper.js';

const placements = Object.freeze([
	'auto',
	'auto-start',
	'auto-end',
	'top',
	'top-start',
	'top-end',
	'right',
	'right-start',
	'right-end',
	'bottom',
	'bottom-start',
	'bottom-end',
	'left',
	'left-start',
	'left-end',
]);

const overflowElements = Object.freeze([
	'scrollParent',
	'scroll-parent',
	'window',
	'viewport',
]);

function validatePlacement(placement) {
	return placements.includes(placement);
}

function validateOverflowElement(element) {
	return overflowElements.includes(element);
}

function validateOffset(offset) {
	return !!offset && offset.split(',').length <= 2;
}

export {
	placements as supportedPlacements,
	overflowElements as supportedOverflowElements,
	validateOverflowElement,
	validatePlacement,
	validateOffset,
};

export default Popper;

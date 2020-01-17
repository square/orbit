const arrInsertTo = (arr, idx, el) => arr.splice(idx, 0, el);
const arrRemoveFrom = (arr, idx) => arr.splice(idx, 1);
const hasChildren = item => item.children && item.children.length > 0;

// finds parent list to item given a path
function getParentListFromPath(list, path) {
	if (!path.length) {
		return list;
	}

	let subitems = list;
	for (let i = 0; i < path.length - 1; i += 1) {
		if (hasChildren(subitems)) {
			subitems = subitems.children;
		}
		subitems = subitems[path[i]];
	}

	if (!subitems) {
		return list;
	}

	if (hasChildren(subitems)) {
		subitems = subitems.children;
	}

	if (!Array.isArray(subitems)) {
		subitems.children = [];
		subitems = subitems.children;
	}

	return subitems;
}

function moveTo(list, from, to) {
	const removeFrom = getParentListFromPath(list, from);
	let removeIdx = from[from.length - 1];

	const insertTo = getParentListFromPath(list, to);
	const insertIdx = to[to.length - 1];

	const item = removeFrom[removeIdx];
	arrInsertTo(insertTo, insertIdx, item);

	if (removeFrom === insertTo && insertIdx < removeIdx) {
		removeIdx += 1;
	}

	arrRemoveFrom(removeFrom, removeIdx);

	return list;
}

function itemDepth(item) {
	if (!hasChildren(item)) {
		return 0;
	}
	const depths = item.children.map(childItem => 1 + itemDepth(childItem));
	return Math.max(...depths);
}

function itemCount(item) {
	if (!item) { return 0; }

	let count = 0;
	const queue = [item];

	while (queue.length) {
		const node = queue.shift();
		count += 1;
		if (hasChildren(node)) {
			queue.push(...node.children);
		}
	}

	return count;
}

const getParent = (list, path) => {
	const parent = getParentListFromPath(list, path.slice(0, -1));
	const idx = path[path.length - 2];
	return parent[idx];
};

const canDrop = ({ to, listApi }) => {
	const { onDragOver } = listApi;

	if (typeof onDragOver === 'function') {
		const { draggingItem, draggingFrom, list } = listApi;

		const dragFrom = getParent(list, draggingFrom);
		const dragTo = getParent(list, to);

		const dragToPosition = to;
		dragToPosition.depth = to.length - 1;

		return onDragOver({
			dragFrom,
			draggingItem,
			dragTo,
			dragToPosition,
		});
	}

	return true;
};

export {
	canDrop,
	moveTo,
	itemDepth,
	itemCount,
};

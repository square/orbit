function emit(el, eventName, originalEvent) {
	const event = new CustomEvent(eventName);
	event.originalEvent = originalEvent;
	el.dispatchEvent(event);
}

function nearestScrollParent(el) {
	if (el === document.body) {
		return el;
	}
	if (
		el.clientHeight < el.scrollHeight
		&& !['visible', 'hidden'].includes(getComputedStyle(el).overflowY)
	) {
		return el;
	}
	return nearestScrollParent(el.parentElement);
}

function createDragShadow(el, shadowClass) {
	const clonedEl = el.cloneNode(true);
	clonedEl.classList.add(shadowClass);
	Object.assign(clonedEl.style, {
		position: 'absolute',
		pointerEvents: 'none',
		zIndex: 10,
	});
	document.body.appendChild(clonedEl);

	return {
		moveTo({ pageX, pageY }) {
			Object.assign(clonedEl.style, {
				top: `${pageY - 24}px`,
				left: `${pageX - 24}px`,
			});
		},
		remove() {
			document.body.removeChild(clonedEl);
		},
	};
}

const draggableEls = new Set();
// Set threshold so clicakbles on the draggable surface are easier to click
const dragThreshold = 5;
let draggingEl = null;

class Draggabble {
	constructor({ el, shadowClass, docBodyClass }) {
		this.el = el;

		// for auto-scroll
		this.scrollSpeed = 0;
		this.stopAutoScroll = false;

		// for drag & drop
		this.shadowClass = shadowClass;
		this.docBodyClass = docBodyClass;
		this.mouseMoved = 0;
		this.enabled = false;

		// bind handlers to instance
		['onMouseDown', 'onMouseMove', 'onMouseUp', 'onMouseEnter', 'onMouseLeave', 'autoScroll'].forEach((handler) => {
			this[handler] = this[handler].bind(this);
		});
	}

	enable() {
		if (this.enabled) { return; }
		this.el.addEventListener('mousedown', this.onMouseDown);
		this.enabled = true;
	}

	disable() {
		if (!this.enabled) { return; }
		this.el.removeEventListener('mousedown', this.onMouseDown);
		this.enabled = false;
	}

	// for drag & drop
	onMouseDown(e) {
		e.preventDefault();
		document.body.classList.add(this.docBodyClass);
		this.mouseMoved = 0;
		this.scrollParent = nearestScrollParent(this.el);
		document.addEventListener('mousemove', this.onMouseMove, { passive: true });
		document.addEventListener('mouseup', this.onMouseUp, { passive: true, once: true });
	}

	// for drag & drop
	onMouseMove(e) {
		if (this.mouseMoved < dragThreshold) {
			this.mouseMoved += 1;
			return;
		}

		if (!draggingEl) {
			emit(this.el, 'dragstart');

			draggingEl = this.el;
			this.$clonedEl = createDragShadow(this.el, this.shadowClass);

			// for auto-scroll
			this.scrollParent.addEventListener('mouseenter', this.onMouseEnter, { passive: true });
			this.scrollParent.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
			this.onMouseEnter();
		}

		this.$clonedEl.moveTo(e);
		emit(this.el, 'drag');

		// for auto-scroll
		const scrollRect = this.scrollParent.getBoundingClientRect();
		// is the mouse closer to the top or bottom edge of the scroll parent?
		const topDist = Math.abs(scrollRect.top - e.clientY);
		const bottomDist = Math.abs(scrollRect.bottom - e.clientY);
		// should we scroll up, or down?
		const speedDirection = topDist < bottomDist ? -1 : 1;
		// should we scroll at 3px per frame, or 0px per frame (i.e. pause auto-scroll)?
		const speedMagnitude = Math.min(topDist, bottomDist) < 40 ? 3 : 0;
		this.scrollSpeed = speedDirection * speedMagnitude;
	}

	// for drag & drop
	onMouseUp() {
		if (draggingEl) {
			this.$clonedEl.remove();
			document.body.classList.remove(this.docBodyClass);
			emit(draggingEl, 'dragend');
			draggingEl = null;
		}
		document.removeEventListener('mousemove', this.onMouseMove);

		// for auto-scroll
		this.scrollParent.removeEventListener('mouseenter', this.onMouseEnter);
		this.scrollParent.removeEventListener('mouseleave', this.onMouseLeave);
		this.onMouseLeave();
	}

	// for auto-scroll
	onMouseEnter() {
		this.stopAutoScroll = false;
		requestAnimationFrame(this.autoScroll);
	}

	// for auto-scroll
	onMouseLeave() {
		this.stopAutoScroll = true;
	}

	autoScroll() {
		this.scrollParent.scrollTop += this.scrollSpeed;
		if (!this.stopAutoScroll) {
			requestAnimationFrame(this.autoScroll);
		} else {
			this.stopAutoScroll = false;
		}
	}
}

const draggable = (() => {
	const instances = new WeakMap();

	function disable(el) {
		if (!instances.has(el)) { return; }
		instances.get(el).disable();
	}

	function enable(el, { docBodyClass, shadowClass }) {
		if (instances.has(el)) {
			instances.get(el).enable();
		} else {
			draggableEls.add(el);
			const inst = new Draggabble({
				el,
				docBodyClass,
				shadowClass,
			});
			inst.enable();
			instances.set(el, inst);
		}
	}

	function toggle(el, { value }) {
		if (!value) {
			disable(el);
		} else {
			enable(el, value);
		}
	}

	return {
		inserted: toggle,
		update: toggle,
		unbind(el) {
			disable(el);
			draggableEls.delete(el);
		},
	};
})();

const droppable = (() => {
	const droppableEventMap = Object.entries({
		mouseenter: 'dragenter',
		mouseleave: 'dragleave',
		mouseup: 'drop',
	});

	return {
		inserted(el) {
			droppableEventMap.forEach(([mouseEvent, dragEvent]) => {
				el.addEventListener(mouseEvent, (e) => {
					if (!draggingEl) { return; }
					emit(el, dragEvent, e);
				}, { passive: true });
			});
		},
	};
})();

export { draggable, droppable };

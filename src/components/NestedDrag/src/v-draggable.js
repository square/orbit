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

const events = {
	down: '',
	up: '',
	move: '',
	enter: '',
	leave: '',
	over: '',
	out: '',
};
const eventNamePrefix = (typeof window !== 'undefined') && window.PointerEvent ? 'pointer' : 'mouse';
Object.keys(events).forEach((key) => {
	events[key] = eventNamePrefix + key;
});

class Draggabble {
	constructor(el) {
		this.el = el;

		// for auto-scroll
		this.scrollSpeed = 0;
		this.stopAutoScroll = false;

		// for drag & drop
		this.mouseMoved = 0;
		this.enabled = false;

		// bind handlers to instance
		['onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerEnter', 'onPointerLeave', 'autoScroll'].forEach((handler) => {
			this[handler] = this[handler].bind(this);
		});
	}

	setOpts({ shadowClass, docBodyClass, dragHandleSelector }) {
		this.shadowClass = shadowClass;
		this.docBodyClass = docBodyClass;
		this.dragHandleSelector = dragHandleSelector;
	}

	enable(opts) {
		this.setOpts(opts);
		if (this.enabled) { return; }
		this.el.addEventListener(events.down, this.onPointerDown);
		this.enabled = true;
	}

	disable() {
		if (!this.enabled) { return; }
		this.el.removeEventListener(events.down, this.onPointerDown);
		this.enabled = false;
	}

	// for drag & drop
	onPointerDown(e) {
		const { target } = e;
		if (
			this.dragHandleSelector
			&& !(
				target.closest(this.dragHandleSelector)
				|| target.matches(this.dragHandleSelector)
			)
		) {
			return;
		}

		e.preventDefault();
		document.body.classList.add(this.docBodyClass);
		this.mouseMoved = 0;
		this.scrollParent = nearestScrollParent(this.el);
		document.addEventListener(events.move, this.onPointerMove, { passive: true });
		document.addEventListener(events.up, this.onPointerUp, { passive: true, once: true });

		/**
		 * Using PointerEvents "has the effect of suppressing these events on all other elements."
		 * Releasing pointer capture allows us to detect the dragging behavior on mobile.
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture
		 * https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture
		 */
		e.target.releasePointerCapture(e.pointerId);
	}

	// for drag & drop
	onPointerMove(e) {
		if (this.mouseMoved < dragThreshold) {
			this.mouseMoved += 1;
			return;
		}

		if (!draggingEl) {
			emit(this.el, 'dragstart');

			draggingEl = this.el;
			this.$clonedEl = createDragShadow(this.el, this.shadowClass);

			// for auto-scroll
			this.scrollParent.addEventListener(events.enter, this.onPointerEnter, { passive: true });
			this.scrollParent.addEventListener(events.leave, this.onPointerLeave, { passive: true });
			this.onPointerEnter();
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
	onPointerUp() {
		if (draggingEl) {
			this.$clonedEl.remove();
			document.body.classList.remove(this.docBodyClass);
			emit(draggingEl, 'dragend');
			draggingEl = null;
		}
		document.removeEventListener(events.move, this.onPointerMove);

		// for auto-scroll
		this.scrollParent.removeEventListener(events.enter, this.onPointerEnter);
		this.scrollParent.removeEventListener(events.leave, this.onPointerLeave);
		this.onPointerLeave();
	}

	// for auto-scroll
	onPointerEnter() {
		this.stopAutoScroll = false;
		requestAnimationFrame(this.autoScroll);
	}

	// for auto-scroll
	onPointerLeave() {
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

	function enable(el, opts) {
		if (instances.has(el)) {
			instances.get(el).enable(opts);
		} else {
			draggableEls.add(el);
			const inst = new Draggabble(el);
			inst.enable(opts);
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
		[events.enter]: 'dragenter',
		[events.leave]: 'dragleave',
		[events.up]: 'drop',
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

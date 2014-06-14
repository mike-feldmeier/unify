(function($) {

	// Used for calculating travel during a drag.  This is reset on each "end" event...
	var origin = null;

	// Usage for finishing off a touch sequence.  "touchend" doesn't provide any coordinates...
	var lastTouch = null;

	$.fn.unify = function(handler) {
		this
			.on("mousedown", function(e) { beginMouse(e, handler); })
			.on("mousemove", function(e) { mouseMove(e, handler); })
			.on("mouseup mouseleave", function(e) { endMouse(e, handler); })
			.on("touchstart", function(e) { beginTouch(e, handler); })
			.on("touchmove", function(e) { touchMove(e, handler); })
			.on("touchend", function(e) { endTouch(e, handler); });
	};

	function beginMouse(e, handler) {
		e.preventDefault();
		origin = { x: e.originalEvent.clientX, y: e.originalEvent.clientY };
		handler(_template({ source: "mouse", type: "begin", current: origin, origin: origin }));
	}

	function mouseMove(e, handler) {
		e.preventDefault();
		var current = { x: e.originalEvent.clientX, y: e.originalEvent.clientY };

		var template = _template({ source: "mouse", type: "move", current: current });

		if(origin) {
			template.type = "drag";
			template.origin = origin;
			template.travel = { x: current.x - origin.x, y: current.y - origin.y };
		}

		handler(template);
	}

	function endMouse(e, handler) {
		e.preventDefault();
		var current = { x: e.originalEvent.clientX, y: e.originalEvent.clientY };
		var template = _template({ source: "mouse", type: "end", current: current });

		if(origin) {
			template.origin = origin;
			template.travel = { x: current.x - origin.x, y: current.y - origin.y };
		}
		
		handler(template);
		origin = null;
	}

	function beginTouch(e, handler) {
		e.preventDefault();
		var touch = _getBestTouch(e);
		origin = { x: touch.clientX, y: touch.clientY };
		handler(_template({ source: "touch", type: "begin", current: origin, origin: origin }));
	}

	function touchMove(e, handler) {
		e.preventDefault();
		var touch = _getBestTouch(e);
		var current = lastTouch = { x: touch.clientX, y: touch.clientY };

		var template = _template({ source: "touch", type: "move", current: current });

		if(origin) {
			template.type = "drag";
			template.origin = origin;
			template.travel = { x: current.x - origin.x, y: current.y - origin.y };
		}

		handler(template);
	}

	function endTouch(e, handler) {
		e.preventDefault();
		var touch = _getBestTouch(e);
		var current = { x: lastTouch.x, y: lastTouch.y };
		var travel = { x: current.x - origin.x, y: current.y - origin.y };
		handler(_template({ source: "touch", type: "end", current: current, origin: origin, travel: travel }));
		origin = lastTouch = null;
	}

	function _getBestTouch(e) {
		var touches = e.originalEvent.touches || e.originalEvent.changedTouches;
		return touches && touches.length > 0 ? touches[0] : null;
	}

	function _template(values) {
		return $.extend({
			source: null,
			type: null,
			current: {
				x: 0,
				y: 0
			},
			origin: {
				x: 0,
				y: 0
			},
			travel: {
				x: 0,
				y: 0
			}
		}, values);
	}

})(jQuery);

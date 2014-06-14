var MAX_ENTRIES = 100;

var testNode = null;
var logNode = null;

$(document).ready(function() {
	testNode = $("#testbox");
	logNode = $("#log .logs");

	testNode.unify(log);

	initButtons();
});

function initButtons() {
	$("#clear-button").click(function(e) {
		e.preventDefault();
		logNode.empty();
	});
}

function log(e) {
	// Clone template, fill, and append to logs...
	var entry = $("#templates .entry").clone();

	$(".source", entry).html(e.source);
	$(".type", entry).html(e.type);
	$(".current", entry).html(e.current.x + ", " + e.current.y);
	$(".origin", entry).html(e.origin.x + ", " + e.origin.y);
	$(".travel", entry).html(e.travel.x + ", " + e.travel.y);

	logNode.append(entry);

	// Clean out old entries to keep memory footprint small...
	var entries = $(".entry", logNode);
	if(entries.length > MAX_ENTRIES) {
		entries.slice(0, entries.length - MAX_ENTRIES).remove();
	}

	// Keep logs scrolled to bottom...
	logNode.scrollTop(logNode.prop("scrollHeight"));
}

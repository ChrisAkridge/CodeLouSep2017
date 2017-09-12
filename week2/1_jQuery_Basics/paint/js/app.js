// Problem: nothing does anything
// Solution: make things work

$("#js-disabled").hide();

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

// Clicking on a color circle should change the selected color
$(".controls").on("click", "li", function() {
	// Deselect old color
	$(this).siblings().removeClass("selected");
	
	// Select new color
	color = $(this).css("background-color")
	$(this).addClass("selected");
});

// When "New Color" is clicked, toggle the color selector
$("#revealColorSelect").click(function() {
	setDisplayColor();
	$("#colorSelect").toggle();
});

// When the sliders have finished changing
var setDisplayColor = function() {
	var red = $("#red").val();
	var green = $("#green").val();
	var blue = $("#blue").val();
	
	$("#newColor").css("background-color", "rgb(" + red + ", " + green + ", " + blue + ")");
}

$("input[type=range]").change(setDisplayColor);

// When "Add Color" is clicked, add a new color to the color circles
$("#addNewColor").click(function() {
	var $newColor = $("<li></li>");
	$newColor.css("background-color", $(newColor).css("background-color"));
	// Also select the new color
	
	$(".controls ul").append($newColor);
	$newColor.click();
});

// Draw on the canvas when the user is holding the LMB over the canvas
$("canvas").mousedown(function(e) {
	lastEvent = e;
	mouseDown = true;
	context.beginPath();
}).mousemove(function(e) {
	if (mouseDown) {
		context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		context.lineTo(e.offsetX, e.offsetY);
		context.strokeStyle = color;
		context.stroke();
		
		lastEvent = e;
	}
}).mouseup(function(e) {
	mouseDown = false;
	context.closePath();
}).mouseleave(function(e) {
	$canvas.mouseup();
});
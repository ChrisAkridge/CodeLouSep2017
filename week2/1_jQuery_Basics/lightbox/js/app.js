// Problem: Clicking on images leads users to dead ends
// Solution: Create an overlay with the large image

// 1. User clicks an image; capture the click event on a link to an image

// 2. Add overlay
// 	a. An image
// 	b. A caption
// 	c. A darkened background
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

$overlay.append($image);
$overlay.append($caption);

$("body").append($overlay);

$("#imageGallery a").click(function(event) {
	// 	a. Show overlay
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	$overlay.show();
	
	//	b. Update overlay with the image linked in the link
	$image.attr("src", imageLocation);
	
	//	c. Add "alt" caption
	$caption.text($(this).children("img").attr("alt"));
});

// 3. When overlay is clicked
//	a. Hide the overlay
$overlay.click(function() {
	$overlay.hide();
});
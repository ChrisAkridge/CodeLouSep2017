var html = '';

function randomByte() { return Math.floor(Math.random() * 256); }

function randomColor() {
	return 'rgb(' + randomByte() + ', ' + randomByte() + ', ' + randomByte() + ')';
}

function formatColor(r, g, b) {
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function pad(string, length, padding) {
	var result = string;
	while (result.length < length) {
		result = padding + result;
	}
	
	return result;
}

function formatColorHex(r, g, b) {
	var rHex = pad(r.toString(16), 2, '0');
	var gHex = pad(g.toString(16), 2, '0');
	var bHex = pad(b.toString(16), 2, '0');
	
	return "#" + rHex + gHex + bHex;
}

function display(color) {
	document.getElementById("colorData").innerHTML = "Color: " + color; 
}

for (var i = 0; i < 100; i++) {
	var r = randomByte();
	var g = randomByte();
	var b = randomByte();
	
	html += '<div class="circle" onmouseover="display(\'' + formatColorHex(r, g, b) +'\')" style="background-color: ' + formatColor(r, g, b) + '"></div>';
}

document.write(html);
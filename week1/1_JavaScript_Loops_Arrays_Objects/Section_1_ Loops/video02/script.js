function randomNumber(upper) {
  return Math.floor( Math.random() * upper ) + 1;
}

var counter = 0;
while (counter < 10000) {
	var random = randomNumber(6);
	document.write(random + ' ');
	counter += 1;
}
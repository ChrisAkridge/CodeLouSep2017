function randomNumber(upper) {
  return Math.floor( Math.random() * upper ) + 1;
}

var computerNumber = randomNumber(10000);
var userNumber = 0;
var attempts = 0;

do {
	var info = (userNumber > computerNumber) ? "too high" : "too low";
	userNumber = parseInt(prompt("I'm thinking of a number between 1 and 10000. Your last guess was " + info + "."));
	attempts += 1;
} while (userNumber !== computerNumber);

document.write("<p>You got " + computerNumber + " in only " + attempts + " tries!</p>");
function print(message) {
  document.write(message);
}

var answers = [
	[ "What is 1 novemvigintillion multiplied by 1,000?", "1 trigintillion" ],
	[ "How many U.S. states would there be if half of them were doubled?", "75"],
	[ "How long is the serial number on a U.S. $1 bill?", "9 characters"],
	[ "How many possible US phone numbers can there be, ignoring extensions but considering area codes?", "10,000,000,000"]
];

function askQuestion(answers, index) {
	var question = answers[index][0];
	var answer = answers[index][1];
	var userAnswer = prompt(question);
	
	return userAnswer.toLowerCase() === answer.toLowerCase();
}

var correct = 0;

for (var i = 0; i < answers.length; i++) {
	if (askQuestion(answers, i)) {
		correct++;
		print("<p>Nice! That was the right answer!</p>");
	} else {
		print("<p>Sorry, that was not the right answer.</p>");
	}
}

var score = ((correct / answers.length) * 100).toFixed(2);
document.write("You got " + correct + " out of " + answers.length + " questions right, for a score of " + score + "%!");
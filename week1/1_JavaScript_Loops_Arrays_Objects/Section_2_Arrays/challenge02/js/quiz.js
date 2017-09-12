var questions = [
  ['How many states are in the United States?', 50],
  ['How many continents are there?', 7],
  ['How many legs does an insect have?', 6]
];
var correctAnswerCount = 0;
var correctAnswers = [];
var wrongAnswers = [];
var question;
var answer;
var response;

function print(message) {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = message;
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    correctAnswerCount += 1;
	correctAnswers.push(question);
  } else {
	  wrongAnswers.push(question);
  }
}

html = "<p>You got " + correctAnswerCount + " question(s) right.</p>"
html += "<p>Correct answers (" + correctAnswerCount + "):</p>";
html += "<ol>";
for (var i = 0; i < correctAnswers.length; i++) {
	html += "<li>" + correctAnswers[i] + "</li>";
}
html += "</ol>";
html += "<p>Incorrect answers (" + wrongAnswers.length + ")";
html += "<ol>";
for (var i = 0; i < wrongAnswers.length; i++) {
	html += "<li>" + wrongAnswers[i] + "</li>";
}
html += "</ol>";
print(html);
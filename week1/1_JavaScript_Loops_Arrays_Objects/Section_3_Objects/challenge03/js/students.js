var students = [ 
  { 
   name: 'Dave',
    track: 'Front End Development',
    achievements: 158,
    points: 14730
  },
  {
    name: 'Jody',
    track: 'iOS Development with Swift',
    achievements: '175',
    points: '16375'
  },
  {
    name: 'Jordan',
    track: 'PHP Development',
    achievements: '55',
    points: '2025'
  },
  {
    name: 'John',
    track: 'Learn WordPress',
    achievements: '40',
    points: '1950'
  },
  {
    name: 'Trish',
    track: 'Rails Development',
    achievements: '5',
    points: '350'
  }
];

function print(str) {
	document.getElementById("output").innerHTML = str;
}

function studentInfo(index) {
	var student = students[index];
	
	var result = "<h2>Name: " + student.name + "</h2>";
	result += "<p>Track: " + student.track + "</p>";
	result += "<p>Achievements: " + student.achievements + "</p>";
	result += "<p>Points: " + student.points + "</p>";
	
	return result;
}

var query = "";
while (query.toLowerCase() !== "quit") {
	query = prompt("Input a student name, or 'quit' to quit.");
	if (query === 'quit') { break; }
	
	var index = -1;
	for (var i = 0; i < students.length; i++) {
		if (students[i].name === query) {
			index = i;
			break;
		}
	}
	
	if (index < 0) {
		print("No student by that name exists.");
	} else {
		print(studentInfo(index));
	}
}
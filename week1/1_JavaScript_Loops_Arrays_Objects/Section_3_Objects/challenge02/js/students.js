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

function studentData(index) {
	var student = students[index];
	
	var result = "<h2>Name: " + student.name;
	result += "<ul><li>Track: " + student.track + "</li>";
	result += "<li>Achievements: " + student.achievements + "</li>";
	result += "<li>Points: " + student.points + "</li></ul>";
	return result;
}

for (var i in students) {
	document.write(studentData(i));
}
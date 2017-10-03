// Incrementalism
// An incremental browser game for the Code Louisville September 2017 Front-End class.
// by Chris Akridge.

// ==== Define Items, Upgrades, and Achievements ====

var items = [];
var upgrades = [];
var achievements = [];

// ==== Items ====
var hdmiCables = {
	name: "HDMI Cables",
	phase: 1,
	cost: 10,
	rate: 0.1,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(hdmiCables);

var whiteboardWall = {
	name: "Whiteboard Wall",
	phase: 1,
	cost: 125,
	rate: 2,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(whiteboardWall);

var smartBoard = {
	name: "SMART Board",
	phase: 1,
	cost: 375,
	rate: 8,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(smartBoard);

var lightingDeck = {
	name: "Lighting Deck",
	phase: 1,
	cost: 1250,
	rate: 17.5,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(lightingDeck);

var wioaPaperwork = {
	name: "WIOA Paperwork",
	phase: 2,
	cost: 14000,
	rate: 35,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(wioaPaperwork);

var orientationPresentation = {
	name: "Orientation Presentation",
	phase: 2,
	cost: 85000,
	rate: 75,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(orientationPresentation);

var standUpGuide = {
	name: "Stand-up Guide",
	phase: 2,
	cost: 190000,
	rate: 140,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(standUpGuide);

var frontEndClassProject = {
	name: "Front-end Class Project",
	phase: 2,
	cost: 485000,
	rate: 325,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(frontEndClassProject);

var treehouseCourses = {
	name: "Treehouse Courses",
	phase: 3,
	cost: 2.25e6,
	rate: 1090,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(treehouseCourses);

var githubAccount = {
	name: "GitHub Account",
	phase: 3,
	cost: 11.85e6,
	rate: 4320,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(githubAccount);

var techEvents = {
	name: "Tech Events",
	phase: 3,
	cost: 62.81e6,
	rate: 8900,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(techEvents);

var finalProject = {
	name: "Final Project",
	phase: 2,
	cost: 489.275e5,
	rate: 64250,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(finalProject);

/* ==== Upgrades ==== */
var touchpad = {
	name: "Touchpad";
	phase: 1;
	checkUnlock: function() {
		// User has made 25 units from clicking
	},
	unlocked: false,
	cost: 40,
	bought: false,
	onBuy: function() {
		// Clicking power is doubled
	}
};
upgrades.push(touchpad);

var woodenCubeMouse = {
	name: "Wooden Cube Mouse";
	phase: 1;
	checkUnlock: function() {
		// User has made 175 units from clicking
	},
	unlocked: false,
	cost: 200,
	bought: false,
	onBuy: function() {
		// Clicking gains +10% of the rate
	}
};
upgrades.push(woodenCubeMouse);

var microsoftIntellimouse = {
	name: "Microsoft IntelliMouse";
	phase: 1;
	checkUnlock: function() {
		// User has made 500 units from clicking
	},
	unlocked: false,
	cost: 2950,
	bought: false,
	onBuy: function() {
		// Clicking gains 20% of the rate
	}
};
upgrades.push(microsoftIntellimouse);

var fourKVideoSupport = {
	name: "4K Video Support";
	phase: 1;
	checkUnlock: function() {
		// Bank reaches 140
	},
	unlocked: false,
	cost: 180,
	bought: false,
	onBuy: function() {
		// HDMI Cables rate +20% for each Whiteboard Wall
		// Whiteboard Walls rate +1% for each HDMI Cable
	}
};
upgrades.push(fourKVideoSupport);

var = {
	name: "";
	phase: ;
	checkUnlock: function() {
	},
	unlocked: false,
	cost: ,
	bought: false,
	onBuy: function() {
	}
};
upgrades.push();
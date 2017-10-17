// Incrementalism
// An incremental browser game for the Code Louisville September 2017 Front-End class.
// by Chris Akridge.

// ==== Helper Functions ====
var numberNames = ['billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion'];

function beautify(number, places = 3) {
	// Numbers less than 1 billion
	var numberText;
	if (number < 1e9) {
		numberText = number.toLocaleString('en-US', {maximumFractionDigits: 0});
	} else if (number < 1e42) {
		var powerOf10 = Math.log10(number);
		var powerOf1000 = Math.floor(powerOf10 / 3);
		var numberNameIndex = (powerOf1000 - 3);
		var mantissa = number / Math.pow(1000, powerOf1000);

		numberText = mantissa.toFixed(3) + " " + numberNames[numberNameIndex];
	} else if (Number.isNaN(number)) {
		numberText = "Not-a-Number :(";
	} else if (!Number.isFinite(number)) { numberText = number.toString(); } else {
		var powerOf10 = Math.floor(Math.log10(number));
		numberText = (number / Math.pow(10, powerOf10)).toFixed(3) + "e" + powerOf10;
	}
	return numberText;
}

// ==== Define Items, Upgrades, and Achievements ====

var phasesUnlocked = [true, false, false];

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
	phase: 3,
	cost: 489.275e5,
	rate: 64250,
	owned: 0,
	totalRate: 0,
	onBuy: function() {}
};
items.push(finalProject);

/* ==== Upgrades ==== */
var touchpad = {
	name: "Touchpad",
	desc: "Your clicking power is doubled.",
	phase: 1,
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
	name: "Wooden Cube Mouse",
	desc: "Clicking gains +10% of your rate.",
	phase: 1,
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
	name: "Microsoft IntelliMouse",
	desc: "Clicking gains +20% of your rate.",
	phase: 1,
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
	name: "4K Video Support",
	desc: "HDMI Cables produce 20% more for each Whiteboard Wall you own. Whiteboard Walls produce 1% more for each HDMI cable you own.",
	phase: 1,
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

var rainbowMarkers = {
	name: "Rainbow Markers",
	desc: "SMART Boards are 25% cheaper.",
	phase: 1,
	checkUnlock: function() {
		// Bank reaches 750
	},
	unlocked: false,
	cost: 1250,
	bought: false,
	onBuy: function() {
	}
};
upgrades.push(rainbowMarkers);

var dedicatedSpeakers = {
	name: "Dedicated Speakers",
	desc: "HDMI Cables produce double the units.",
	phase: 1,
	checkUnlock: function() {
		// Bank reaches 1750
	},
	unlocked: false,
	cost: 3750,
	bought: false,
	onBuy: function() {
	}
};
upgrades.push(dedicatedSpeakers);

var gratedLightFixture = {
	name: "Grated Light Fixture",
	desc: "HDMI Cables are 25% cheaper.",
	phase: 1,
	checkUnlock: function() {
		// Bank reaches 1875
	},
	unlocked: false,
	cost: 2500,
	bought: false,
	onBuy: function() {
	}
};
upgrades.push(gratedLightFixture);

var mentorsAssistance = {
	name: "Mentor's Assistance",
	desc: "All income is doubled.",
	phase: 1,
	checkUnlock: function() {
		// Bank reaches 2020
	},
	unlocked: false,
	cost: 5100,
	bought: false,
	onBuy: function() {
	}
};
upgrades.push(mentorsAssistance);

var completeClassroom = {
	name: "Complete Classroom",
	desc: "All income is doubled.",
	phase: 1,
	checkUnlock: function() {
		// 20 HDMI Cables, 8 Whiteboard Walls, 1 SMART Board, 8 Lighting Fixtures
	},
	unlocked: false,
	cost: 15000,
	bought: false,
	onBuy: function() {
	}
};
upgrades.push(completeClassroom);

upgrades.sort(function(a, b) { return b - a; });

// ==== Achievements ====
achievements.push({name: "A Thought", desc: "Earn 1 unit.", unlocked: false});
achievements.push({name: "An Idea", desc: "Earn 10 units.", unlocked: false});
achievements.push({name: "Research", desc: "Earn 100 units.", unlocked: false});
achievements.push({name: "Team-building", desc: "Earn 1,000 units.", unlocked: false});
achievements.push({name: "Office Purchase", desc: "Earn 10,000 units.", unlocked: false});
achievements.push({name: "Earn It", desc: "Click for 1 unit.", unlocked: false});
achievements.push({name: ".click()", desc: "Click for 10 units.", unlocked: false});
achievements.push({name: "Mouse-Up", desc: "Click for 100 units.", unlocked: false});
achievements.push({name: "Callbacks", desc: "Click for 1,000 units.", unlocked: false});
achievements.push({name: "Penny Stocks", desc: "Reach a rate of 0.1 units/second.", unlocked: false});
achievements.push({name: "Low-Yield Bonds", desc: "Reach a rate of 1 unit/second.", unlocked: false});
achievements.push({name: "Inflow", desc: "Reach a rate of 10 units/second.", unlocked: false});
achievements.push({name: "Income", desc: "Reach a rate of 100 units/second.", unlocked: false});
achievements.push({name: "Interest", desc: "Reach a rate of 1,000 units/second.", unlocked: false});

// ==== Build HTML for Items, Upgrades, and Achievements

function buildItemHTML(item, index) {
	if (/* phasesUnlocked[item.phase - 1] */ true) {
		var itemsDivName = "#phase-" + item.phase + "-items";
		var itemsDiv = $(itemsDivName);
		itemsDiv.append('<div class="item" id="item-' + index + '"></div>');

		var itemHTML = $("#item-" + index);
		itemHTML.addClass("disabled-item-" + item.phase);
		itemHTML.append('<div class="owned" item="owned-' + index + '">0</div>');
		itemHTML.append('<div class="item-info-container">');

		var infoContainer = itemHTML.find('.item-info-container');
		infoContainer.append('<div class="item-name"></div>');
		infoContainer.append('<div class="item-cost" id="cost-' + index + '"></div>');
		infoContainer.append('<div class="item-rate" id="rate-' + index + '"></div>');

		infoContainer.find('.item-name').html(item.name);
		$("#cost-" + index).html('Cost: ' + beautify(item.cost));
		$("#rate-" + index).html('Rate: ' + beautify(item.rate));
	}
}

function buildUpgradeHTML(upgrade, index) {
	if (/* !upgrade.unlocked */ false) { return; }
	var upgradesContainer = $("#upgrades-container");
	upgradesContainer.append('<div class="upgrade" id="upgrade-' + index + '"></div>');

	var upgradeHTML = $("#upgrade-" + index);
	if (/* bank < upgrade.cost */ true) { upgradeHTML.addClass('disabled-upgrade'); }
	upgradeHTML.append('<div class="upgrade-name"></div>');
	upgradeHTML.append('<div class="upgrade-info"></div>');

	upgradeHTML.find('.upgrade-name').html(upgrade.name);
	upgradeHTML.find('.upgrade-info').html('Cost: ' + beautify(upgrade.cost, 3) + '<br><em>' + upgrade.desc + '</em>');
}

function buildAchievementHTML(achievement, index) {
	var redXSymbol = '&#x274C;';
	var checkmarkSymbol = '&#x2714;&#xFE0F;';

	var achievementsContainer = $("#achievements-container");
	achievementsContainer.append('<div class="achievement" id="achievement-' + index + '"></div>');

	var achievementHTML = $("#achievement-" + index);
	achievementHTML.append('<span class="achievement-unlocked"></span>')
	achievementHTML.append('<span class="achievement-name"></span>');
	achievementHTML.append('<span class="achievement-desc"></span>');

	var unlocked = achievementHTML.find(".achievement-unlocked");
	var name = achievementHTML.find(".achievement-name");
	var desc = achievementHTML.find(".achievement-desc");

	if (!achievement.unlocked) {
		achievementHTML.addClass("achievement-disabled");
		unlocked.html(redXSymbol);
		unlocked.css('font-size', '0.75rem');
		achievementHTML.css('padding', '0');
		name.css('display', 'none');
		desc.css('display', 'none');
	} else {
		unlocked.html(checkmarkSymbol);
	}
	name.html(achievement.name);
	desc.html(achievement.desc);
}

for (var i in items) {
	buildItemHTML(items[i], i);
}

for (var i in upgrades) {
	buildUpgradeHTML(upgrades[i], i);
}

for (var i in achievements) {
	buildAchievementHTML(achievements[i], i);
}

// $("#phase-2-items").hide();
// $("#phase-3-items").hide();

// ==== Core Variables and Functionality ====
var bank = 0;
var rate = 10;

var baseClickPower = 1;
var clickPercentOfRate = 0;
var unitsPerClick = 1;

// Statistics
var totalUnitsEarned = 0;
var totalUnitsSpent = 0;
var totalClicks = 0;
var totalUnitsMadeFromClicking = 0;
var totalItemsOwned = 0;
var totalUpgradesUnlocked = 0;
var totalAchievementsUnlocked = 0;

function update() {
	// Updates the bank based on the rate.
	// Assumes 30 fps.

	var newEarnings = rate / 30;
	bank += newEarnings;
	totalUnitsEarned += newEarnings;

	updateGameInfo();
}

function recalcUnitsPerClick() {
	var clickPowerFromRate = rate * clickPercentOfRate;
	return baseClickPower + clickPowerFromRate;
}

// On Rate Change function

// ==== Event Handlers ====
$("#bank").click(function() {
	var newEarnings = unitsPerClick;
	bank += newEarnings;
	totalUnitsEarned += newEarnings;
	totalClicks++;
	totalUnitsMadeFromClicking += newEarnings;
});

// ==== UI Update ====
function updateGameInfo() {
	$("#bank").html(beautify(bank) + " units");
	$("#rate").html(beautify(rate) + " units per second");
}

// Update Stats panel once per second
setInterval(update, 33.333);
// Incrementalism
// An incremental browser game for the Code Louisville September 2017 Front-End class.
// by Chris Akridge.

// ==== Helper Functions ====
var numberNames = ['billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion'];

function beautify(number, places = 3) {
	// Numbers less than 1 billion
	var numberText;
	if (number < 1e9) {
		numberText = number.toLocaleString('en-US', {maximumFractionDigits: places});
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
	onBuy: function() {
		if (fourKVideoSupport.bought) {
			this.checkRate();
			whiteboardWall.checkRate();
			updateItemInfo(1 /* Whiteboard Walls */);
		}
	},
	checkRate: function() {
		if (!fourKVideoSupport.bought) {
			this.rate =  0.1;
		} else {
			this.rate = 0.1 * (1 + (whiteboardWall.owned * 0.2));
		}

		if (dedicatedSpeakers.bought) { this.rate *= 2; }

		this.totalRate = this.owned * this.rate;
	}
};
items.push(hdmiCables);

var whiteboardWall = {
	name: "Whiteboard Wall",
	phase: 1,
	cost: 125,
	rate: 2,
	owned: 0,
	totalRate: 0,
	onBuy: function() {
		if (fourKVideoSupport.bought) {
			this.checkRate();
			hdmiCables.checkRate();
			updateItemInfo(0 /* HDMI Cables */)
		}
	},
	checkRate: function() {
		if (!fourKVideoSupport.bought) {
			this.rate =  2;
		} else {
			this.rate = 2 * (1 + (hdmiCables.owned * 0.01));
		}
		this.totalRate = this.owned * this.rate;
	}
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
		return totalUnitsMadeFromClicking >= 25;
	},
	unlocked: false,
	cost: 40,
	bought: false,
	onBuy: function() {
		baseClickPower *= 2;
		recalcUnitsPerClick();
	}
};
upgrades.push(touchpad);

var woodenCubeMouse = {
	name: "Wooden Cube Mouse",
	desc: "Clicking gains +10% of your rate.",
	phase: 1,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 175;
	},
	unlocked: false,
	cost: 200,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.1;
		recalcUnitsPerClick();
	}
};
upgrades.push(woodenCubeMouse);

var microsoftIntellimouse = {
	name: "Microsoft IntelliMouse",
	desc: "Clicking gains +20% of your rate.",
	phase: 1,
	checkUnlock: function() {
		return totalUnitsMadeFromClicking >= 500;
	},
	unlocked: false,
	cost: 2950,
	bought: false,
	onBuy: function() {
		clickPercentOfRate += 0.2;
		recalcUnitsPerClick();
	}
};
upgrades.push(microsoftIntellimouse);

var fourKVideoSupport = {
	name: "4K Video Support",
	desc: "HDMI Cables produce 20% more for each Whiteboard Wall you own. Whiteboard Walls produce 1% more for each HDMI cable you own.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 140;
	},
	unlocked: false,
	cost: 180,
	bought: false,
	onBuy: function() {
		hdmiCables.checkRate();
		whiteboardWall.checkRate();

		recalculateRate();

		updateItemInfo(0);
		updateItemInfo(1);
	}
};
upgrades.push(fourKVideoSupport);

var rainbowMarkers = {
	name: "Rainbow Markers",
	desc: "SMART Boards are 25% cheaper.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 750;
	},
	unlocked: false,
	cost: 1250,
	bought: false,
	onBuy: function() {
		smartBoard.cost *= 0.75;
		updateItemInfo(2 /* SMART Boards */)
	}
};
upgrades.push(rainbowMarkers);

var dedicatedSpeakers = {
	name: "Dedicated Speakers",
	desc: "HDMI Cables produce double the units.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 1750;
	},
	unlocked: false,
	cost: 3750,
	bought: false,
	onBuy: function() {
		hdmiCables.checkRate();
		recalculateRate();
		updateItemInfo(0 /* HDMI Cables */);
	}
};
upgrades.push(dedicatedSpeakers);

var gratedLightFixture = {
	name: "Grated Light Fixture",
	desc: "HDMI Cables are 25% cheaper.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 1875;
	},
	unlocked: false,
	cost: 2500,
	bought: false,
	onBuy: function() {
		hdmiCables.cost *= 0.75;
		updateItemInfo(0 /* HDMI Cables */);
	}
};
upgrades.push(gratedLightFixture);

var mentorsAssistance = {
	name: "Mentor's Assistance",
	desc: "All income is doubled.",
	phase: 1,
	checkUnlock: function() {
		return bank >= 2020;
	},
	unlocked: false,
	cost: 5100,
	bought: false,
	onBuy: function() {
		multiplier *= 2;
		for (var i in items) { updateItemInfo(i); }
	}
};
upgrades.push(mentorsAssistance);

var completeClassroom = {
	name: "Complete Classroom",
	desc: "All income is doubled.",
	phase: 1,
	checkUnlock: function() {
		// 20 HDMI Cables, 8 Whiteboard Walls, 1 SMART Board, 8 Lighting Fixtures
		return hdmiCables.owned >= 20 &&
			   whiteboardWall.owned >= 8 &&
			   smartBoard.owned >= 1 &&
			   lightingDeck.owned >= 8;
	},
	unlocked: false,
	cost: 15000,
	bought: false,
	onBuy: function() {
		multiplier *= 2;
		for (var i in items) { updateItemInfo(i); }

		// Complete Phase 1!
		phasesUnlocked[1] = true;
		$("#stars").css('display', 'flex');
		$("#phase-1-star").show();
		$("#phase-1-special").css('display', 'flex');
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

// ==== Phase 1 Specials ====
var mentors = {
	cost: 100,
	priceMultiplier: 1.5,
	owned: 0,
	onBuy: function() {
		bank -= this.cost;
		this.cost *= this.priceMultiplier;
		this.owned++;
		for (var i in items) {
			items[i].cost *= 0.99;
			updateItemInfo(i);
		}
		$("#hired-mentors").text(this.owned);
		$("#mentor-cost").text("Cost: " + beautify(this.cost, 0));
	}
}

var students = {
	cost: 100,
	priceMultiplier: 2,
	owned: 0,
	onBuy: function() {
		bank -= this.cost;
		this.cost *= this.priceMultiplier;
		this.owned++;
		studentMultiplier += 0.01;
		for (var i in items) {
			updateItemInfo(i);
		}
		$("#enrolled-students").text(this.owned);
		$("#student-cost").text("Cost: " + beautify(this.cost, 0));
		recalculateRate();
	}
}

// ==== Build HTML for Items, Upgrades, and Achievements

function buildItemHTML(item, index) {
	if (/* phasesUnlocked[item.phase - 1] */ true) {
		var itemsDivName = "#phase-" + item.phase + "-items";
		var itemsDiv = $(itemsDivName);
		itemsDiv.append('<div class="item" id="item-' + index + '"></div>');

		var itemHTML = $("#item-" + index);
		itemHTML.addClass("disabled-item-" + item.phase);
		itemHTML.append('<div class="owned" id="owned-' + index + '">0</div>');
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
	var lockImage = '<img class="achievement-lock" src="lock.png">';
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
		unlocked.html(lockImage);
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
var rate = 0;
var multiplier = 1;
var studentMultiplier = 1;

var baseClickPower = 1;
var clickPercentOfRate = 0;
var unitsPerClick = 1;

var itemPriceIncreaseFactor = 1.15;

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
	unitsPerClick = baseClickPower + clickPowerFromRate;
}

function recalculateRate() {
	rate = 0;
	for (var i in items) {
		rate += items[i].owned * items[i].rate;
	}

	rate *= studentMultiplier;
	rate *= multiplier;

	$("#rate").html(beautify(rate) + " units per second");
}

// ==== Update Locked and Unlocked Objects ====
function checkItemsUnlocked() {
	for (var i in items) {
		checkItemUnlocked(i);
	}
}

function checkItemUnlocked(index) {
	var $itemDiv = $("#item-" + index);
	var disabledClassName = "disabled-item-" + items[index].phase;
	if (bank >= items[index].cost) {
		$itemDiv.removeClass(disabledClassName);
	} else {
		$itemDiv.addClass(disabledClassName);
	}
}

function checkUpgradesUnlocked() {
	for (var i in upgrades) {
		checkUpgradeUnlocked(i);
	}
}

function checkUpgradeUnlocked(index) {
	var $upgradeDiv = $("#upgrade-" + index);
	var upgrade = upgrades[index];

	if (!upgrade.unlocked && upgrade.checkUnlock()) {
		upgrade.unlocked = true;
		$upgradeDiv.show();
	}

	if (bank >= upgrade.cost) {
		$upgradeDiv.removeClass("disabled-upgrade");
	} else {
		$upgradeDiv.addClass("disabled-upgrade");
	}
}

// ==== Event Handlers ====
$("#bank").click(function() {
	var newEarnings = unitsPerClick;
	bank += newEarnings;
	totalUnitsEarned += newEarnings;
	totalClicks++;
	totalUnitsMadeFromClicking += newEarnings;
});

$("#rate").click(function() {
	// Speed cheat!
	bank *= 1000;
});

function assignItemClickHandlers() {
	for (var i in items) {
		$("#item-" + i).click({index: i}, function(event) {
			var item = items[event.data.index];
			if (bank < item.cost) {
				return;
			} else {
				bank -= item.cost;
				item.cost *= itemPriceIncreaseFactor;
				item.owned++;
				item.totalRate = item.rate * item.owned;
				item.onBuy();
				recalculateRate();
				updateItemInfo(event.data.index);
				checkItemUnlocked(event.data.index);
			}
		});
	}
}

function assignUpgradeClickHandlers() {
	for (var i in upgrades) {
		$("#upgrade-" + i).click({index: i}, function(event) {
			var upgrade = upgrades[event.data.index];
			if (bank < upgrade.cost) {
				return;
			} else {
				bank -= upgrade.cost;
				upgrade.bought = true;
				upgrade.onBuy();
				recalculateRate();
				$("#upgrade-" + event.data.index).hide();
			}
		});
	}
}

$("#mentor-container").click(function() {
	if (bank >= mentors.cost) {
		mentors.onBuy();
	}
});

$("#student-container").click(function() {
	if (bank >= students.cost) {
		students.onBuy();
	}
});

// ==== UI Update ====
function updateGameInfo() {
	$("#bank").html(beautify(bank, 0) + " units");
}

function updateItemInfo(index) {
	var item = items[index];
	$("#owned-" + index).text(item.owned);
	$("#cost-" + index).text("Cost: " + beautify(item.cost, 0));
	$("#rate-" + index).text("Rate: " + beautify(item.rate * multiplier * studentMultiplier));
}

// Update Stats panel once per second
setInterval(update, 33.333);

function oncePerSecondUpdate() {
	checkItemsUnlocked();
	checkUpgradesUnlocked();
}

setInterval(oncePerSecondUpdate, 1000);

// ==== Loader ====
function load() {
	assignItemClickHandlers();
	assignUpgradeClickHandlers();

	$(".upgrade").hide();
}

load();
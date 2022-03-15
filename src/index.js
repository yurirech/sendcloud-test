import "core-js";
import metric100D from "./data/metric-100D.json";
import metricP100D from "./data/metric-P100D.json";
import "./styles/main.scss";

// // Variables

let navbarButtons = document.querySelectorAll(".navbar-button");
let acButtonOff = document.getElementById("ac-off");
let acButtonOn = document.getElementById("ac-on");
let heatButtonOff = document.getElementById("heat-off");
let heatButtonOn = document.getElementById("heat-on");
let wheel19 = document.getElementById("wheel19");
let wheel21 = document.getElementById("wheel21");
let speedPanel = document.getElementById("speed-panel");
let speedArrowUp = document.getElementById("speed-arrow-up");
let speedArrowDown = document.getElementById("speed-arrow-down");
let temperaturePanel = document.getElementById("temperature-panel");
let temperatureArrowUp = document.getElementById("temperature-arrow-up");
let temperatureArrowDown = document.getElementById("temperature-arrow-down");

// Event listeners

// Loop through all navbarButtons and add a event listener on each one
navbarButtons.forEach(function (button) {
	button.addEventListener("click", function () {
		let activeButton = document.querySelector(".navbar-button.active");
		addAndRemoveClass(button, activeButton, "active");
	});
});

// // Make AC/Heate Button toggle between on/off when clicked
acButtonOff.addEventListener("click", function () {
	addAndRemoveClass(acButtonOff, acButtonOn, "hide");
	loadCurrentRangePerCharge();
});

acButtonOn.addEventListener("click", function () {
	addAndRemoveClass(acButtonOn, acButtonOff, "hide");
	loadCurrentRangePerCharge();
});

heatButtonOff.addEventListener("click", function () {
	addAndRemoveClass(heatButtonOff, heatButtonOn, "hide");
	loadCurrentRangePerCharge();
});

heatButtonOn.addEventListener("click", function () {
	addAndRemoveClass(heatButtonOn, heatButtonOff, "hide");
	loadCurrentRangePerCharge();
});

// Choose wheelsize 19" or 21" when clicking
wheel19.addEventListener("click", function () {
	addAndRemoveClass(wheel19, wheel21, "active");
	loadCurrentRangePerCharge();
});

wheel21.addEventListener("click", function () {
	addAndRemoveClass(wheel21, wheel19, "active");
	loadCurrentRangePerCharge();
});

// Speed arrows controls
speedArrowUp.addEventListener("click", function () {
	speedPanel.innerHTML = parseInt(speedPanel.innerHTML) + 10;

	// Disable click when the max speed is reached and reactvates speedArrowDown
	if (speedPanel.innerHTML === "140") {
		speedArrowUp.classList.add("disable-click");
	} else if (speedPanel.innerHTML === "80") {
		speedArrowDown.classList.remove("disable-click");
	}

	loadCurrentRangePerCharge();
});

speedArrowDown.addEventListener("click", function () {
	speedPanel.innerHTML = parseInt(speedPanel.innerHTML) - 10;

	// Disable click when the minimum speed is reached and reactivates speedArrowUp
	if (speedPanel.innerHTML === "70") {
		speedArrowDown.classList.add("disable-click");
	} else if (speedPanel.innerHTML === "130") {
		speedArrowUp.classList.remove("disable-click");
	}

	loadCurrentRangePerCharge();
});

// Temperature Controller
temperatureArrowUp.addEventListener("click", function () {
	temperaturePanel.innerHTML = parseInt(temperaturePanel.innerHTML) + 10;

	// Disable click when the maximun temperature is reached and reactivates temperatureArrowDown
	if (temperaturePanel.innerHTML === "40") {
		temperatureArrowUp.classList.add("disable-click");
	} else if (temperaturePanel.innerHTML === "0") {
		temperatureArrowDown.classList.remove("disable-click");
	}

	// Checks the current temperature and displays the right ac Button
	if (parseInt(temperaturePanel.innerHTML) === 20) {
		heatButtonOff.classList.add("hide");
		heatButtonOn.classList.add("hide");
		acButtonOff.classList.remove("hide");
	}

	loadCurrentRangePerCharge();
});

temperatureArrowDown.addEventListener("click", function () {
	temperaturePanel.innerHTML = parseInt(temperaturePanel.innerHTML) - 10;

	// Disable click when the minimum temperature is reached and reactivates temperatureArrowUp
	if (temperaturePanel.innerHTML === "-10") {
		temperatureArrowDown.classList.add("disable-click");
	} else if (temperaturePanel.innerHTML === "30") {
		temperatureArrowUp.classList.remove("disable-click");
	}

	// Checks the current temperature and displays the right ac Button
	if (parseInt(temperaturePanel.innerHTML) === 0) {
		acButtonOff.classList.add("hide");
		acButtonOn.classList.add("hide");
		heatButtonOff.classList.remove("hide");
	}

	loadCurrentRangePerCharge();
});

// Functions

/**
 * Adds a class to an element and removes it from another.
 * @param activateElement  The element to have the class added.
 * @param deactivateElement The element to have the class removed.
 * @param appliedClass class to be applied
 */

function addAndRemoveClass(activateElement, deactivateElement, appliedClass) {
	activateElement.classList.add(appliedClass);
	deactivateElement.classList.remove(appliedClass);
}

/**
 * Checks which ac button [heatButton/AC_Button] is not hidden by checking the class 'hide'.
 * Only one button will return undefined
 * if heatButtonOff or acButtonOff returns undefined, it means the ac is off
 * @return "off"
 * otherwise
 * @return "on"
 */

function checkCurrentTemperatureButton() {
	if (
		heatButtonOff.classList[0] === undefined ||
		acButtonOff.classList[0] === undefined
	) {
		return "off";
	}
	return "on";
}

/**
 * Checks which wheel is currently active but checking the "active" class.
 * if the wheel19 has the "active" class
 * @returns 19
 * otherwise
 * @returns 21
 */

function checkCurrentWheel() {
	if (wheel19.classList[wheel19.classList.length - 1] === "active") {
		return 19;
	}
	return 21;
}

/**
 * Retrieves the current Range by Charge for the model specified.
 * @param modelMetric the model metric imported form the json file
 * @param teslaModel the car model you want to be modiffied
 * 1. Retrieves the current wheel and the ac state
 * 2. Filters the array of given modelMetric and
 * returns the current HWY based on the current wheel, temperature and ac state
 * 3.Filters the returned HWY array based on current current KMH
 * 4. Updates the HTML inserting the given teslaModel and current KMH
 */

function getCurrentRangePerCharge(modelMetric, teslaModel) {
	const currentWheel = checkCurrentWheel();
	const acState = checkCurrentTemperatureButton();

	const filteredArr = modelMetric.filter(function (metric) {
		return (
			currentWheel === metric.wheelsize &&
			metric.ac === acState &&
			metric.temp == temperaturePanel.innerHTML
		);
	});

	const currentKilometer = filteredArr[0].hwy.filter(function (kilometer) {
		return speedPanel.innerHTML == kilometer.kmh;
	});

	document.getElementById(teslaModel).innerHTML =
		currentKilometer[0].kilometers + "<sup>KM</sup>";
}

/**
 * Runs the getCurrentRangePerCharge for each of the carm models.
 */

function loadCurrentRangePerCharge() {
	getCurrentRangePerCharge(metric100D, "100D");
	getCurrentRangePerCharge(metricP100D, "P100D");
}

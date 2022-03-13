import metric100D from "./data/metric-100D.json";
import metricP100D from "./data/metric-P100D.json";
import "./styles/main.scss";

// document.getElementById('button1').onclick = activateButton
let navbarButtons = document.querySelectorAll(".navbar-button");
navbarButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		let activeButton = document.querySelector(".navbar-button.active");
		addAndRemoveClass(button, activeButton, "active");
	});
});

// Make AC/Heate Button toggle between on/off when clicked

let AC_ButtonOff = document.getElementById("ac-off");
let AC_ButtonOn = document.getElementById("ac-on");
let heatButtonOff = document.getElementById("heat-off");
let heatButtonOn = document.getElementById("heat-on");

AC_ButtonOff.addEventListener("click", (e) => {
	addAndRemoveClass(AC_ButtonOff, AC_ButtonOn, "hide");
	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

AC_ButtonOn.addEventListener("click", (e) => {
	addAndRemoveClass(AC_ButtonOn, AC_ButtonOff, "hide");
	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

heatButtonOff.addEventListener("click", (e) => {
	addAndRemoveClass(heatButtonOff, heatButtonOn, "hide");
	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

heatButtonOn.addEventListener("click", (e) => {
	addAndRemoveClass(heatButtonOn, heatButtonOff, "hide");
	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

// Choose wheelsize when clicking
let wheel19 = document.getElementById("wheel19");
let wheel21 = document.getElementById("wheel21");

wheel19.addEventListener("click", (e) => {
	addAndRemoveClass(wheel19, wheel21, "active");
	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

wheel21.addEventListener("click", (e) => {
	addAndRemoveClass(wheel21, wheel19, "active");
	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

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

// Speed controller

let speedPanel = document.getElementById("speed-panel");
let speedArrowUp = document.getElementById("speed-arrow-up");
let speedArrowDown = document.getElementById("speed-arrow-down");

speedArrowUp.addEventListener("click", (e) => {
	speedPanel.innerHTML = parseInt(speedPanel.innerHTML) + 10;

	if (speedPanel.innerHTML === "140") {
		speedArrowUp.classList.add("disable-click");
	} else if (speedPanel.innerHTML === "80") {
		speedArrowDown.classList.remove("disable-click");
	}

	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

speedArrowDown.addEventListener("click", (e) => {
	speedPanel.innerHTML = parseInt(speedPanel.innerHTML) - 10;

	if (speedPanel.innerHTML === "70") {
		speedArrowDown.classList.add("disable-click");
	} else if (speedPanel.innerHTML === "130") {
		speedArrowUp.classList.remove("disable-click");
	}

	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

// Temperature Controller

let temperaturePanel = document.getElementById("temperature-panel");
let temperatureArrowUp = document.getElementById("temperature-arrow-up");
let temperatureArrowDown = document.getElementById("temperature-arrow-down");
console.log(metric100D);

temperatureArrowUp.addEventListener("click", (e) => {
	temperaturePanel.innerHTML = parseInt(temperaturePanel.innerHTML) + 10;

	if (temperaturePanel.innerHTML === "40") {
		temperatureArrowUp.classList.add("disable-click");
	} else if (temperaturePanel.innerHTML === "0") {
		temperatureArrowDown.classList.remove("disable-click");
	}

	if (parseInt(temperaturePanel.innerHTML) === 20) {
		heatButtonOff.classList.add("hide");
		heatButtonOn.classList.add("hide");
		AC_ButtonOff.classList.remove("hide");
	}

	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

temperatureArrowDown.addEventListener("click", (e) => {
	temperaturePanel.innerHTML = parseInt(temperaturePanel.innerHTML) - 10;

	if (temperaturePanel.innerHTML === "-10") {
		temperatureArrowDown.classList.add("disable-click");
	} else if (temperaturePanel.innerHTML === "30") {
		temperatureArrowUp.classList.remove("disable-click");
	}

	if (parseInt(temperaturePanel.innerHTML) < 20) {
		AC_ButtonOff.classList.add("hide");
		AC_ButtonOn.classList.add("hide");
		heatButtonOff.classList.remove("hide");
	}

	getCurrentKmsValues(metric100D, "100D");
	getCurrentKmsValues(metricP100D, "P100D");
});

function checkCurrentTemperatureButton() {
	let temperatureButton;

	if (
		heatButtonOff.classList[0] === undefined ||
		AC_ButtonOff.classList[0] === undefined
	) {
		temperatureButton = "off";
	} else {
		temperatureButton = "on";
	}

	return temperatureButton;
}

function checkCurrentWheel() {
	let wheel;

	if (wheel19.classList[wheel19.classList.length - 1] === "active") {
		wheel = 19;
	} else {
		wheel = 21;
	}

	return wheel;
}

// const a = checkCurrentWheel();
// const b = checkCurrentTemperatureButton();
// console.log(a, b);


function getCurrentKmsValues(modelMetric, teslaModel) {
  const currentWheel = checkCurrentWheel();
  const temperatureButton = checkCurrentTemperatureButton();

	const filteredArr = modelMetric.filter(
		({ ac, temp, wheelsize }) =>
			currentWheel === wheelsize &&
			ac === temperatureButton &&
			temp == temperaturePanel.innerHTML
	);
	const currentKilometer = filteredArr[0].hwy.filter(
		({ kmh }) => speedPanel.innerHTML == kmh
	);
  console.log(currentKilometer);

	document.getElementById(
		teslaModel
	).innerHTML = `${currentKilometer[0].kilometers}<sup>KM</sup>`;
}

// metric100D.forEach(({ ac, hwy, temp, wheelsize }) => {
// 	// console.log(ac, hwy, temp, wheelsize);
// });

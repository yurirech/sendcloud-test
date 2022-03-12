import { bro } from "./bro";
import "./styles/main.scss";

// document.getElementById('button1').onclick = activateButton

let navbarButtons = document.querySelectorAll(".navbar-button");
navbarButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		let activeButton = document.querySelector(".navbar-button.active");
		activeButton.classList.remove("active");
		button.classList.add("active");
	});
});

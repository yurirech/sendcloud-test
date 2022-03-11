import { bro } from "./bro";
import "./styles/main.scss";

// document.getElementById('button1').onclick = activateButton

let navbarButtons = document.querySelectorAll(".navbar-button");
navbarButtons.forEach((button) =>
	button.addEventListener("click", (e) => {
		button.classList.add("active");
		deactivateOtherButtons(button.id);
	})
);

function deactivateOtherButtons(id) {
	navbarButtons.forEach((button) =>
  {
    if(button.id !== id) {
      button.classList.remove('active')
  }}
  )
}

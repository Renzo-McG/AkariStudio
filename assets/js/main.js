const revealDemo = document.querySelector("[data-reveal-demo]");
const revealControl = document.querySelector("[data-reveal-control]");
const controlLabel = document.querySelector("[data-control-label]");
const revealStatus = document.querySelector("[data-reveal-status]");

if (revealDemo && revealControl && controlLabel && revealStatus) {
  revealControl.addEventListener("click", () => {
    const isComposed = revealDemo.classList.toggle("is-composed");

    revealControl.setAttribute("aria-pressed", String(isComposed));
    controlLabel.textContent = isComposed ? "See the ingredients" : "Bring it to light";
    revealStatus.textContent = isComposed
      ? "One clear experience makes the quality easier to recognise and trust."
      : "The ingredients are strong. The experience brings them together.";
  });
}

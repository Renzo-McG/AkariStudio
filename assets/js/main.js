document.documentElement.classList.remove("no-js");

const revealDemo = document.querySelector("[data-reveal-demo]");
const revealControl = document.querySelector("[data-reveal-control]");
const controlLabel = document.querySelector("[data-control-label]");
const revealStatus = document.querySelector("[data-reveal-status]");
const evidenceState = document.querySelector("[data-state-evidence]");
const experienceState = document.querySelector("[data-state-experience]");

if (
  revealDemo &&
  revealControl &&
  controlLabel &&
  revealStatus &&
  evidenceState &&
  experienceState
) {
  revealControl.addEventListener("click", () => {
    const isComposed = revealDemo.classList.toggle("is-composed");

    document.body.classList.toggle("is-illuminated", isComposed);
    revealControl.setAttribute("aria-pressed", String(isComposed));
    controlLabel.textContent = isComposed ? "See the ingredients" : "Bring it to light";
    evidenceState.classList.toggle("is-active", !isComposed);
    experienceState.classList.toggle("is-active", isComposed);
    revealStatus.textContent = isComposed
      ? "One clear experience makes the quality easier to recognise and trust."
      : "The ingredients are strong. The experience brings them together.";
  });
}

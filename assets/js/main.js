document.documentElement.classList.remove("no-js");

const header = document.querySelector("[data-header]");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Open navigation";
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.querySelector(".sr-only").textContent = willOpen ? "Close navigation" : "Open navigation";
    mobileMenu.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

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
      ? "The work, reputation and proof now form one experience people can understand and trust."
      : "The ingredients are strong. The experience brings them together.";
  });
}

const createTabs = ({ tabSelector, panelSelector, keyAttribute }) => {
  const tabs = [...document.querySelectorAll(tabSelector)];
  const panels = [...document.querySelectorAll(panelSelector)];

  if (!tabs.length || !panels.length) return;

  const activate = (activeTab, moveFocus = false) => {
    const key = activeTab.dataset[keyAttribute];

    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset[keyAttribute.replace("Tab", "Panel")] !== key;
    });

    if (moveFocus) activeTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let targetIndex = null;
      if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = tabs.length - 1;

      if (targetIndex !== null) {
        event.preventDefault();
        activate(tabs[targetIndex], true);
      }
    });
  });

  activate(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
};

createTabs({
  tabSelector: "[data-question-tab]",
  panelSelector: "[data-question-panel]",
  keyAttribute: "questionTab",
});

createTabs({
  tabSelector: "[data-evidence-tab]",
  panelSelector: "[data-evidence-panel]",
  keyAttribute: "evidenceTab",
});

const beforeAfter = document.querySelector("[data-before-after]");
const beforeAfterInput = document.querySelector("[data-before-after-input]");

if (beforeAfter && beforeAfterInput) {
  const updateBeforeAfter = () => {
    beforeAfter.style.setProperty("--position", `${beforeAfterInput.value}%`);
  };

  beforeAfterInput.addEventListener("input", updateBeforeAfter);
  beforeAfterInput.addEventListener("keydown", (event) => {
    const current = Number(beforeAfterInput.value);
    let next = null;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = Math.min(100, current + 5);
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = Math.max(0, current - 5);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 100;

    if (next !== null) {
      event.preventDefault();
      beforeAfterInput.value = String(next);
      updateBeforeAfter();
    }
  });
}

const intentSelect = document.querySelector("[data-intent-select]");
const contactLinks = document.querySelectorAll("[data-contact-intent]");

if (intentSelect && contactLinks.length) {
  contactLinks.forEach((link) => {
    link.addEventListener("click", () => {
      intentSelect.value = link.dataset.contactIntent;
    });
  });
}

const projectForm = document.querySelector("[data-project-form]");

if (projectForm) {
  const result = projectForm.querySelector("[data-form-result]");
  const summary = projectForm.querySelector("[data-form-summary]");
  const copyButton = projectForm.querySelector("[data-copy-summary]");
  const copyStatus = projectForm.querySelector("[data-copy-status]");

  const setError = (field, message) => {
    field.setAttribute("aria-invalid", String(Boolean(message)));
    const error = projectForm.querySelector(`[data-error-for="${field.name}"]`);
    if (error) error.textContent = message;
  };

  const validate = () => {
    let firstInvalid = null;

    ["name", "email", "business", "website", "gap"].forEach((name) => {
      const field = projectForm.elements[name];
      let message = "";

      if (field.required && !field.value.trim()) message = "Please complete this field.";
      if (!message && name === "email" && field.value && !field.validity.valid) {
        message = "Enter a valid email address.";
      }
      if (!message && name === "website" && field.value && !field.validity.valid) {
        message = "Use a complete address beginning with http:// or https://.";
      }

      setError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;

    const values = new FormData(projectForm);
    const preparedSummary = [
      "AKARI STUDIO — PROJECT ENQUIRY",
      "",
      `Intent: ${values.get("intent")}`,
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      `Business: ${values.get("business")}`,
      `Website: ${values.get("website") || "Not supplied"}`,
      `Timing: ${values.get("timing")}`,
      `Support: ${values.get("support")}`,
      "",
      "What the current site is not communicating:",
      values.get("gap"),
    ].join("\n");

    summary.textContent = preparedSummary;
    result.hidden = false;
    result.focus();
  });

  projectForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") setError(field, "");
    });
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summary.textContent);
      copyStatus.textContent = "Copied.";
    } catch {
      copyStatus.textContent = "Select the summary and copy it manually.";
    }
  });
}

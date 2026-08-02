document.documentElement.classList.remove("no-js");

const header = document.querySelector("[data-header]");
const headerSentinel = document.querySelector("[data-header-sentinel]");

if (header && headerSentinel) {
  const headerObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle("is-scrolled", !entry.isIntersecting);
  });

  headerObserver.observe(headerSentinel);
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
const workChapter = document.querySelector("[data-work-chapter]");

if (
  revealDemo &&
  revealControl &&
  controlLabel &&
  revealStatus &&
  evidenceState &&
  experienceState
) {
  let workHasBeenReached = false;

  const updateWorkConnection = () => {
    document.body.classList.toggle(
      "is-work-reached",
      revealDemo.classList.contains("is-composed") && workHasBeenReached
    );
  };

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
    updateWorkConnection();
  });

  if (workChapter) {
    const workObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) workHasBeenReached = true;
        updateWorkConnection();
      },
      { threshold: 0.12 }
    );

    workObserver.observe(workChapter);
  }
}

const process = document.querySelector("[data-process]");

if (process) {
  const controls = [...process.querySelectorAll("[data-process-control]")];
  const steps = [...process.querySelectorAll("[data-process-step]")];
  const nodes = [...process.querySelectorAll("[data-process-node]")];
  const visual = process.querySelector("[data-process-visual]");
  const count = process.querySelector("[data-process-count]");
  const output = process.querySelector("[data-process-output]");
  const line = process.querySelector("[data-process-line]");
  const headerElement = document.querySelector("[data-header]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let manualUntil = 0;

  controls.forEach((control) => {
    control.disabled = false;
  });

  const setActiveProcessStep = (index, source = "observer") => {
    if (source === "observer" && Date.now() < manualUntil) return;
    activeIndex = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, stepIndex) => {
      const isActive = stepIndex === activeIndex;
      step.classList.toggle("is-active", isActive);
      controls[stepIndex].setAttribute("aria-pressed", String(isActive));
    });

    nodes.forEach((node, nodeIndex) => {
      node.classList.toggle("is-active", nodeIndex === activeIndex);
      node.classList.toggle("is-complete", nodeIndex < activeIndex || reducedMotion.matches);
    });

    process.style.setProperty("--process-progress", reducedMotion.matches ? "1" : String(activeIndex / (steps.length - 1)));
    if (line) line.style.transform = "scaleX(var(--process-progress))";
    if (count) count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 04`;
    if (output) output.textContent = steps[activeIndex].querySelector(".process-step__result").textContent;
  };

  const updateProcessMode = () => {
    const wideEnough = window.matchMedia("(min-width: 1100px)").matches;
    const tallEnough = window.matchMedia("(min-height: 760px)").matches;
    const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 0;
    const stickyTop = headerHeight + 24;
    const availableHeight = window.innerHeight - stickyTop - 32;
    process.dataset.processMode = "measure";
    const visualHeight = visual ? visual.getBoundingClientRect().height : Number.POSITIVE_INFINITY;
    const naturalThresholds = steps.length === 4 && process.scrollHeight > visualHeight + 420;
    const canStick = wideEnough && tallEnough && visualHeight <= availableHeight && naturalThresholds;

    process.dataset.processMode = canStick ? "sticky" : "flow";
  };

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      manualUntil = Date.now() + 900;
      setActiveProcessStep(index, "control");
    });

    control.addEventListener("focus", () => {
      manualUntil = Date.now() + 900;
      setActiveProcessStep(index, "control");
    });
  });

  const processObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveProcessStep(steps.indexOf(visible.target));
    },
    { rootMargin: "-24% 0px -48% 0px", threshold: [0.15, 0.35, 0.6] }
  );

  steps.forEach((step) => processObserver.observe(step));
  window.addEventListener("resize", updateProcessMode);
  reducedMotion.addEventListener("change", () => setActiveProcessStep(activeIndex, "control"));
  updateProcessMode();
  setActiveProcessStep(0, "control");
}

const routeComparison = document.querySelector("[data-route-comparison]");

if (routeComparison) {
  const routeInputs = [...routeComparison.querySelectorAll("[data-route-select]")];
  const routeTitle = routeComparison.querySelector("[data-route-title]");
  const routeDescription = routeComparison.querySelector("[data-route-description]");
  const routeContent = {
    "one-page": {
      title: "A business with one clear story and one principal enquiry route.",
      description: "Bring the proposition, proof, services and contact into one carefully ordered page.",
    },
    "multi-page": {
      title: "A business with more services, audiences or proof to explore.",
      description: "Give distinct customer questions dedicated space while keeping the whole journey connected.",
    },
  };

  const updateRoute = (value) => {
    const content = routeContent[value];
    if (!content) return;
    routeComparison.dataset.route = value;
    routeTitle.textContent = content.title;
    routeDescription.textContent = content.description;
  };

  routeInputs.forEach((input) => {
    input.addEventListener("change", () => updateRoute(input.value));
    input.addEventListener("focus", () => {
      input.checked = true;
      updateRoute(input.value);
    });
  });
}

const createTabs = ({ tabSelector, panelSelector }) => {
  const tabs = [...document.querySelectorAll(tabSelector)];
  const panels = [...document.querySelectorAll(panelSelector)];

  if (!tabs.length || !panels.length) return;

  const activate = (activeTab, moveFocus = false) => {
    const targetPanelId = activeTab.getAttribute("aria-controls");

    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== targetPanelId;
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
});

createTabs({
  tabSelector: "[data-evidence-tab]",
  panelSelector: "[data-evidence-panel]",
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

const viewportDemo = document.querySelector("[data-viewport-demo]");

if (viewportDemo) {
  const frame = viewportDemo.querySelector("[data-viewport-frame]");
  const iframe = viewportDemo.querySelector("[data-viewport-iframe]");
  const handle = viewportDemo.querySelector("[data-viewport-handle]");
  const readout = viewportDemo.querySelector("[data-viewport-readout]");
  const presets = [...viewportDemo.querySelectorAll("[data-viewport-preset]")];
  const MIN_WIDTH = 320;
  const MAX_WIDTH = 1280;
  const narrow = window.matchMedia("(max-width: 720px)");

  const labelFor = (width) => {
    if (width <= 430) return "Mobile";
    if (width <= 900) return "Tablet";
    return "Desktop";
  };

  let requestedWidth = MAX_WIDTH;

  // The readout must describe what is actually on screen. The frame is
  // capped by its container (width: min(100%, --preview-width)), so the
  // rendered width can be narrower than the requested preset. The
  // effective width is computed rather than measured, because the frame
  // animates and would otherwise report a stale value mid-transition.
  const effectiveWidth = () => {
    const available = Math.round(
      frame.parentElement ? frame.parentElement.getBoundingClientRect().width : requestedWidth
    );
    return available ? Math.min(requestedWidth, available) : requestedWidth;
  };

  const refreshReadout = () => {
    if (!readout) return;
    const actual = effectiveWidth();
    readout.textContent = `${labelFor(actual)} · ${actual}px`;
  };

  const applyWidth = (width, { syncPresets = true } = {}) => {
    requestedWidth = Math.round(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width)));
    frame.style.setProperty("--preview-width", `${requestedWidth}px`);

    if (syncPresets) {
      presets.forEach((button) => {
        const isActive = Number(button.dataset.viewportPreset) === requestedWidth;
        button.setAttribute("aria-pressed", String(isActive));
      });
    }

    refreshReadout();
  };

  // The embed itself is lazily loaded natively via the iframe's own
  // loading="lazy" attribute, so it works with or without this script.

  presets.forEach((button) => {
    button.addEventListener("click", () => {
      applyWidth(Number(button.dataset.viewportPreset));
    });
  });

  // Pointer-only resize handle. Presets remain the accessible control,
  // so the handle stays out of the tab order.
  if (handle) {
    let startX = 0;
    let startWidth = 0;

    const onMove = (event) => {
      applyWidth(startWidth + (event.clientX - startX) * 2, { syncPresets: true });
    };

    const onUp = (event) => {
      viewportDemo.classList.remove("is-resizing");
      handle.releasePointerCapture?.(event.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      startX = event.clientX;
      startWidth = frame.getBoundingClientRect().width;
      viewportDemo.classList.add("is-resizing");
      handle.setPointerCapture?.(event.pointerId);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  }

  const applyDefaultForViewport = () => {
    applyWidth(narrow.matches ? 390 : MAX_WIDTH);
  };

  narrow.addEventListener("change", applyDefaultForViewport);

  // Keep the readout honest when the container itself changes size,
  // without attaching a continuous scroll or resize handler.
  if ("ResizeObserver" in window) {
    let lastNarrow = narrow.matches;
    const stageObserver = new ResizeObserver(() => {
      if (narrow.matches !== lastNarrow) {
        lastNarrow = narrow.matches;
        applyDefaultForViewport();
        return;
      }
      refreshReadout();
    });

    stageObserver.observe(frame);
  }

  applyDefaultForViewport();
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
  const emailSubmit = projectForm.querySelector("[data-email-submit]");

  if (emailSubmit) emailSubmit.disabled = false;

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
    const businessName = values.get("business").trim();
    const intent = values.get("intent") === "review" ? "Current-site review" : "Website project";
    const preparedSummary = [
      "Hello Akari Studio,",
      "",
      "I would like to start a conversation about my website.",
      "",
      `Enquiry: ${intent}`,
      `Name: ${values.get("name").trim()}`,
      `Reply email: ${values.get("email").trim()}`,
      `Business: ${businessName}`,
      `Current website: ${values.get("website")?.trim() || "Not supplied"}`,
      `Ideal timing: ${values.get("timing")}`,
      `Website route: ${values.get("support")}`,
      "",
      "What the current site is not communicating:",
      values.get("gap").trim(),
      "",
      "Kind regards,",
      values.get("name").trim(),
    ].join("\n");

    summary.textContent = preparedSummary;
    result.hidden = false;
    copyStatus.textContent = "";

    const subject = `Project enquiry | ${businessName || "Akari Studio"}`;
    const emailHref = `mailto:hello@akaristudio.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedSummary)}`;
    window.location.href = emailHref;
  });

  projectForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") setError(field, "");
    });
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summary.textContent);
      copyStatus.textContent = "Copied to clipboard.";
    } catch {
      copyStatus.textContent = "Select the summary and copy it manually.";
    }
  });
}

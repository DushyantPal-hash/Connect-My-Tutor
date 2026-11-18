import "./components/site-header.js";
import "./components/site-footer.js";
import "./components/course-catalog.js";
import "./components/course-detail.js";
import "./components/tutor-catalog.js";
import "./components/tutor-detail.js";
import { courseTracks } from "./course-data.js";

const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

addEventListener("scroll", () => {
  header.classList.toggle("scrolled", scrollY > 30);
});

const reducedMotionPreference = matchMedia("(prefers-reduced-motion: reduce)");
if (
  document.body.classList.contains("home-page") &&
  !reducedMotionPreference.matches &&
  "IntersectionObserver" in window
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
  );
  const revealTargets = document.querySelectorAll(
    ".home-page .section-head, .home-page .course-card, .home-page .tuition-card, " +
      ".home-page .join-card, .home-page .feature, .home-page .step, " +
      ".home-page tutor-catalog, .home-page .quote, .home-page .cta-band, " +
      ".home-page .contact-info, .home-page #contact form",
  );

  document.body.classList.add("has-scroll-reveal");
  revealTargets.forEach((target) => {
    const siblingIndex = Array.prototype.indexOf.call(
      target.parentElement.children,
      target,
    );
    target.style.setProperty(
      "--reveal-delay",
      `${Math.min(siblingIndex, 5) * 70}ms`,
    );
    target.classList.add("scroll-reveal");
    revealObserver.observe(target);
  });
}

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  navLinks.classList.toggle("show", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
  });
});

const marquee = document.getElementById("marquee");
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

const courseCarousel = document.getElementById("courseCarousel");
if (courseCarousel) {
  const title = document.getElementById("courseTitle");
  const subjects = document.getElementById("courseSubjects");
  const subjectLabels = subjects.querySelectorAll("span");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let currentSubjectIndex = 0;
  let timer;
  const updateSubjects = () => {
    subjectLabels.forEach((label, index) => {
      label.hidden = !reducedMotion.matches && index !== currentSubjectIndex;
    });
  };
  const showNextCourse = () => {
    title.classList.add("is-changing");
    subjects.classList.add("is-changing");
    window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % courseTracks.length;
      currentSubjectIndex = (currentSubjectIndex + 1) % subjectLabels.length;
      title.textContent = courseTracks[currentIndex].title;
      updateSubjects();
      title.classList.remove("is-changing");
      subjects.classList.remove("is-changing");
    }, 180);
  };

  const updateTimer = () => {
    window.clearInterval(timer);
    timer = undefined;
    updateSubjects();
    if (reducedMotion.matches || document.hidden) return;
    timer = window.setInterval(showNextCourse, 2000);
  };

  document.addEventListener("visibilitychange", updateTimer);
  reducedMotion.addEventListener("change", updateTimer);
  updateTimer();
}

const quotes = document.querySelector(".quotes");
if (quotes) {
  const track = quotes.querySelector(".quotes-track");
  const controls = document.querySelector(".quotes-controls");
  const dots = controls.querySelector(".quotes-dots");
  const previousButton = controls.querySelector("[data-quotes-previous]");
  const nextButton = controls.querySelector("[data-quotes-next]");
  const autoplayButton = controls.querySelector("[data-quotes-autoplay]");
  const cards = [...track.querySelectorAll(".quote")];
  const carouselSection = quotes.closest(".testimonials");
  let visibleCount = 0;
  let currentPage = 0;
  let autoplayTimer;
  let isAutoplayPaused = false;
  let isHovered = carouselSection.matches(":hover");
  let isFocused = false;
  let isPointerDown = false;

  const getVisibleCount = () => {
    if (matchMedia("(max-width: 640px)").matches) return 1;
    if (matchMedia("(max-width: 980px)").matches) return 2;
    return 3;
  };

  const updateControls = () => {
    const pageCount = dots.children.length;
    currentPage = Math.min(
      pageCount - 1,
      Math.round(quotes.scrollLeft / quotes.clientWidth),
    );
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= pageCount - 1;
    [...dots.children].forEach((dot, index) => {
      if (index === currentPage) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const updateAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
    autoplayButton.hidden = reducedMotionPreference.matches;
    autoplayButton.textContent = isAutoplayPaused ? "Play" : "Pause";
    autoplayButton.setAttribute(
      "aria-label",
      isAutoplayPaused
        ? "Resume automatic review slides"
        : "Pause automatic review slides",
    );

    if (
      reducedMotionPreference.matches ||
      document.hidden ||
      isAutoplayPaused ||
      isHovered ||
      isFocused ||
      isPointerDown ||
      dots.children.length <= 1
    ) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      const nextPage = (currentPage + 1) % dots.children.length;
      quotes.scrollTo({
        left: nextPage * quotes.clientWidth,
        behavior: "smooth",
      });
    }, 2500);
  };

  const buildSlides = (pageToShow = 0) => {
    visibleCount = getVisibleCount();
    const slides = [];
    for (let index = 0; index < cards.length; index += visibleCount) {
      const slide = document.createElement("div");
      slide.className = "quote-slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute(
        "aria-label",
        `${slides.length + 1} of ${Math.ceil(cards.length / visibleCount)}`,
      );
      cards.slice(index, index + visibleCount).forEach((card) => {
        slide.append(card);
      });
      slides.push(slide);
    }

    track.replaceChildren(...slides);
    track.classList.add("is-carousel");
    dots.replaceChildren(
      ...slides.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "quotes-dot";
        dot.setAttribute("aria-label", `Go to review slide ${index + 1}`);
        dot.addEventListener("click", () => {
          quotes.scrollTo({
            left: index * quotes.clientWidth,
            behavior: reducedMotionPreference.matches ? "auto" : "smooth",
          });
          updateAutoplay();
        });
        return dot;
      }),
    );

    controls.hidden = slides.length <= 1;
    currentPage = Math.min(pageToShow, slides.length - 1);
    quotes.scrollLeft = currentPage * quotes.clientWidth;
    updateControls();
    updateAutoplay();
  };

  previousButton.addEventListener("click", () => {
    quotes.scrollTo({
      left: (currentPage - 1) * quotes.clientWidth,
      behavior: reducedMotionPreference.matches ? "auto" : "smooth",
    });
    updateAutoplay();
  });
  nextButton.addEventListener("click", () => {
    quotes.scrollTo({
      left: (currentPage + 1) * quotes.clientWidth,
      behavior: reducedMotionPreference.matches ? "auto" : "smooth",
    });
    updateAutoplay();
  });
  autoplayButton.addEventListener("click", () => {
    isAutoplayPaused = !isAutoplayPaused;
    isFocused = false;
    updateAutoplay();
  });
  quotes.addEventListener("scroll", updateControls, { passive: true });

  buildSlides();
  carouselSection.addEventListener("mouseenter", () => {
    isHovered = false;
    updateAutoplay();
  });
  carouselSection.addEventListener("mouseleave", () => {
    isHovered = false;
    updateAutoplay();
  });
  carouselSection.addEventListener("focusin", () => {
    isFocused = false;
    updateAutoplay();
  });
  carouselSection.addEventListener("focusout", (event) => {
    if (!carouselSection.contains(event.relatedTarget)) {
      isFocused = false;
      updateAutoplay();
    }
  });
  carouselSection.addEventListener("pointerdown", () => {
    isPointerDown = true;
    updateAutoplay();
  });
  const resumeAfterPointerInteraction = () => {
    isPointerDown = false;
    updateAutoplay();
  };
  window.addEventListener("pointerup", resumeAfterPointerInteraction);
  window.addEventListener("pointercancel", resumeAfterPointerInteraction);
  document.addEventListener("visibilitychange", updateAutoplay);
  reducedMotionPreference.addEventListener("change", updateAutoplay);
  window.addEventListener("resize", () => {
    const nextVisibleCount = getVisibleCount();
    if (nextVisibleCount !== visibleCount) {
      const firstCardIndex = currentPage * visibleCount;
      buildSlides(Math.floor(firstCardIndex / nextVisibleCount));
    }
  });
}

const iitRadios = document.querySelectorAll('input[name="iit"]');
if (iitRadios.length) {
  const iitDetails = document.querySelectorAll("[data-iit-detail]");
  const updateIitDetails = () => {
    const selectedIit = document.querySelector('input[name="iit"]:checked');
    const isIit = selectedIit && selectedIit.value === "Yes";
    iitDetails.forEach((field) => {
      const input = field.querySelector("input");
      field.hidden = !isIit;
      input.disabled = !isIit;
      if (!isIit) input.value = "";
    });
  };

  iitRadios.forEach((radio) => {
    radio.addEventListener("change", updateIitDetails);
  });
  updateIitDetails();
}

const emailForms = document.querySelectorAll("form[data-email-form]");
if (emailForms.length) {
  const successDialog = document.createElement("dialog");
  successDialog.className = "form-confirmation";
  successDialog.setAttribute("aria-labelledby", "formConfirmationTitle");

  const successTitle = document.createElement("h2");
  successTitle.id = "formConfirmationTitle";
  successTitle.textContent = "Form submitted";
  const successText = document.createElement("p");
  successText.textContent =
    "Your details have been sent to Connect My Tutor successfully.";
  const closeDialogButton = document.createElement("button");
  closeDialogButton.type = "button";
  closeDialogButton.className = "btn btn-primary";
  closeDialogButton.textContent = "Close";
  closeDialogButton.addEventListener("click", () => successDialog.close());

  successDialog.append(successTitle, successText, closeDialogButton);
  document.body.append(successDialog);
}

emailForms.forEach((form) => {
  const errorMessage = form.querySelector(".form-error");
  let showingValidationError = false;

  const updateValidationError = () => {
    form
      .querySelectorAll(
        "input[aria-invalid], select[aria-invalid], textarea[aria-invalid]",
      )
      .forEach((field) => {
        if (field.validity.valid) field.removeAttribute("aria-invalid");
      });
    const invalidField = form.querySelector(":invalid");
    if (!invalidField) {
      errorMessage.hidden = true;
      showingValidationError = false;
      return;
    }

    const fieldset = invalidField.closest("fieldset");
    const label =
      (fieldset && fieldset.querySelector("legend")) ||
      (invalidField.labels && invalidField.labels[0]);
    const fieldName = label
      ? label.textContent.replace(/\s*\*$/, "").trim()
      : "This field";
    invalidField.setAttribute("aria-invalid", "true");
    errorMessage.textContent = `${fieldName}: ${invalidField.validationMessage}`;
    errorMessage.hidden = false;
  };

  const refreshValidationError = () => {
    if (showingValidationError) updateValidationError();
  };
  form.addEventListener(
    "invalid",
    () => {
      showingValidationError = true;
      updateValidationError();
    },
    true,
  );
  form.addEventListener("input", refreshValidationError);
  form.addEventListener("change", refreshValidationError);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorMessage.hidden = true;
    showingValidationError = false;

    form.querySelectorAll("[data-required-group]").forEach((group) => {
      const selected = group.querySelectorAll(
        'input[type="checkbox"]:checked',
      ).length;
      const minimum = Number(group.dataset.minSelections || 0);
      const maximum = Number(group.dataset.maxSelections || Infinity);
      const error = group.querySelector("[data-group-error]");
      const isInvalid = selected < minimum || selected > maximum;

      error.hidden = !isInvalid;
      group.setAttribute("aria-invalid", String(isInvalid));
      if (isInvalid) {
        error.textContent =
          selected > maximum
            ? `Please select no more than ${maximum} options.`
            : "Please select at least one option.";
      }
    });

    const invalidGroup = form.querySelector(
      '[data-required-group][aria-invalid="true"]',
    );
    if (invalidGroup) {
      invalidGroup.querySelector('input[type="checkbox"]').focus();
      return;
    }

    if (!form.checkValidity()) {
      showingValidationError = true;
      updateValidationError();
      form.querySelector(":invalid").reportValidity();
      return;
    }

    const formData = new FormData(form);
    const submission = new URLSearchParams();
    formData.forEach((value, name) => {
      if (submission.has(name)) {
        submission.set(name, `${submission.get(name)}, ${value}`);
      } else {
        submission.append(name, value);
      }
    });
    submission.set("Source page", `${document.title} (${location.pathname})`);
    submission.append("_subject", `New form submission - ${document.title}`);
    submission.append("_template", "table");

    const successMessage = form.querySelector(".form-success");
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    errorMessage.hidden = true;
    successMessage.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    form.setAttribute("aria-busy", "true");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/vaidyaiitd@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: submission,
        },
      );
      const result = await response.json();
      const requestSucceeded =
        result.success === true || result.success === "true";
      if (!response.ok || !requestSucceeded) {
        errorMessage.textContent =
          typeof result.message === "string" && result.message.trim()
            ? result.message
            : `The form service returned status ${response.status}.`;
        errorMessage.hidden = false;
        return;
      }

      form.reset();
      form.querySelectorAll("textarea").forEach((field) => {
        field.value = "";
      });
      form.querySelectorAll("[data-required-group]").forEach((group) => {
        group.removeAttribute("aria-invalid");
        const error = group.querySelector("[data-group-error]");
        if (error) error.hidden = true;
      });
      const selectedIitRadio = form.querySelector('input[name="iit"]');
      if (selectedIitRadio) {
        selectedIitRadio.dispatchEvent(new Event("change", { bubbles: true }));
      }

      successMessage.hidden = true;
      document.querySelector(".form-confirmation").showModal();
    } catch (error) {
      console.error("Form submission failed.", error);
      errorMessage.textContent =
        "We couldn't send your details. Please try again or email vaidyaiitd@gmail.com.";
      errorMessage.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      form.removeAttribute("aria-busy");
    }
  });
});

document
  .querySelectorAll('[data-required-group] input[type="checkbox"]')
  .forEach((input) => {
    input.addEventListener("change", () => {
      const group = input.closest("[data-required-group]");
      const selected = group.querySelectorAll(
        'input[type="checkbox"]:checked',
      ).length;
      const minimum = Number(group.dataset.minSelections || 0);
      const maximum = Number(group.dataset.maxSelections || Infinity);
      const error = group.querySelector("[data-group-error]");
      const isInvalid = selected < minimum || selected > maximum;

      group.setAttribute("aria-invalid", String(isInvalid));
      error.hidden = !isInvalid;
      if (isInvalid) {
        error.textContent =
          selected > maximum
            ? `Please select no more than ${maximum} options.`
            : "Please select at least one option.";
      }
    });
    input
      .closest("[data-required-group]")
      .setAttribute("aria-required", "true");
  });

const tutorSearch = document.getElementById("tutorSearch");
if (tutorSearch) {
  const tutorCards = [...document.querySelectorAll(".tutors-grid .tutor")];
  const params = new URLSearchParams(location.search);
  tutorSearch.value = params.get("subject") || "";

  const filterTutors = () => {
    const query = tutorSearch.value.trim().toLowerCase();
    tutorCards.forEach((card) => {
      card.hidden = !card.textContent.toLowerCase().includes(query);
    });
    document.getElementById("noTutors").hidden = tutorCards.some(
      (card) => !card.hidden,
    );
  };

  tutorSearch.addEventListener("input", filterTutors);
  filterTutors();
}

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
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let timer;
  const showNextCourse = () => {
    title.classList.add("is-changing");
    window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % courseTracks.length;
      title.textContent = courseTracks[currentIndex].title;
      title.classList.remove("is-changing");
    }, 180);
  };

  const updateTimer = () => {
    window.clearInterval(timer);
    timer = undefined;
    if (reducedMotion.matches || document.hidden) return;
    timer = window.setInterval(showNextCourse, 6000);
  };

  document.addEventListener("visibilitychange", updateTimer);
  reducedMotion.addEventListener("change", updateTimer);
  updateTimer();
}

document.querySelectorAll("form[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

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
      form.reportValidity();
      return;
    }

    const successMessage = form.querySelector(".form-success");
    successMessage.hidden = false;
    form.querySelector('button[type="submit"]').textContent = "Form checked ✓";
    form
      .querySelectorAll("input, select, textarea, button")
      .forEach((element) => {
        element.disabled = true;
      });
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

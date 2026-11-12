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
  const slide = document.getElementById("courseSlide");
  const category = document.getElementById("courseCategory");
  const title = document.getElementById("courseTitle");
  const summary = document.getElementById("courseSummary");
  const subjects = document.getElementById("courseSubjects");
  const exploreLink = document.getElementById("courseExploreLink");
  const image = document.getElementById("courseHeroImage");
  const visualLabel = document.getElementById("courseVisualLabel");
  const slideCount = document.getElementById("courseSlideCount");
  const dots = document.getElementById("courseCarouselDots");
  const previous = document.getElementById("courseCarouselPrevious");
  const next = document.getElementById("courseCarouselNext");
  const toggle = document.getElementById("courseCarouselToggle");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let timer;
  let autoplayEnabled = !reducedMotion.matches;

  const renderDots = () => {
    dots.replaceChildren(
      ...courseTracks.map((course, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "course-carousel-dot";
        dot.setAttribute("aria-label", `Show ${course.title} course`);
        dot.addEventListener("click", () => showSlide(index));
        return dot;
      }),
    );
  };

  const updateControls = () => {
    const dotButtons = dots.querySelectorAll("button");
    dotButtons.forEach((dot, index) => {
      const isCurrent = index === currentIndex;
      dot.classList.toggle("is-current", isCurrent);
      if (isCurrent) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    slide.setAttribute(
      "aria-label",
      `Course ${currentIndex + 1} of ${courseTracks.length}: ${courseTracks[currentIndex].title}`,
    );
    slideCount.innerHTML = `${String(currentIndex + 1).padStart(2, "0")} <span>/ ${String(courseTracks.length).padStart(2, "0")}</span>`;
    toggle.textContent = autoplayEnabled ? "❚❚" : "▶▶";
    toggle.setAttribute(
      "aria-label",
      autoplayEnabled
        ? "Pause automatic course slides"
        : "Play automatic course slides",
    );
    toggle.title = autoplayEnabled
      ? "Pause automatic slides"
      : "Play automatic slides";
  };

  const showSlide = (index) => {
    currentIndex = (index + courseTracks.length) % courseTracks.length;
    const course = courseTracks[currentIndex];

    slide.classList.add("is-changing");
    image.classList.add("is-changing");
    window.setTimeout(() => {
      category.textContent = course.category;
      title.replaceChildren(
        document.createTextNode(`${course.title} tutoring, tailored to `),
        Object.assign(document.createElement("span"), {
          className: "hero-highlight",
          textContent: "your goals.",
        }),
      );
      summary.textContent = course.summary;
      subjects.replaceChildren(
        ...course.subjects.slice(0, 3).map((subject) => {
          const chip = document.createElement("span");
          chip.textContent = subject;
          return chip;
        }),
      );
      exploreLink.href = `course-${course.slug}.html`;
      exploreLink.setAttribute("aria-label", `Explore ${course.title} course`);
      image.src = `images/${course.art}`;
      image.alt = "";
      visualLabel.textContent = `${course.title} learning`;
      updateControls();
      slide.classList.remove("is-changing");
      image.classList.remove("is-changing");
    }, 140);
  };

  const stopTimer = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  const startTimer = () => {
    stopTimer();
    if (!autoplayEnabled || document.hidden) return;
    timer = window.setInterval(() => showSlide(currentIndex + 1), 6000);
  };

  renderDots();
  showSlide(0);
  updateControls();

  previous.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    startTimer();
  });
  next.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    startTimer();
  });
  toggle.addEventListener("click", () => {
    autoplayEnabled = !autoplayEnabled;
    updateControls();
    startTimer();
  });
  document.addEventListener("visibilitychange", startTimer);
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) autoplayEnabled = false;
    updateControls();
    startTimer();
  });
  startTimer();
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

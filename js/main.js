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

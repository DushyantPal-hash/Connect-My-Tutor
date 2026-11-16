import { courseTracks } from "../course-data.js";

class CourseDetail extends HTMLElement {
  connectedCallback() {
    const course = courseTracks.find(
      (track) => track.slug === this.dataset.course,
    );
    if (!course) {
      this.innerHTML =
        '<div class="container course-not-found"><h1>Course not found</h1><p>We could not find this course. Browse all available academic tracks instead.</p><a class="btn btn-primary" href="courses.html">Browse courses</a></div>';
      return;
    }

    document.title = `${course.title} Tutoring & Course Support — Connect My Tutor`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = course.summary;

    // Add the page class so the CSS styles apply (already in your HTML body, but safe to have)
    this.classList.add("course-track-page");

    // Set the background image variable. If it's missing, fallback to 'none'
    if (course.courseheroimage) {
      this.style.setProperty(
        "--courseheroimage",
        `url("${course.courseheroimage}")`,
      );
    } else {
      this.style.setProperty("--courseheroimage", "none");
    }

    this.renderCourseTrack(course);
  }

  renderCourseTrack(course) {
    const subjects =
      course.subjects.length > 1
        ? `${course.subjects.slice(0, -1).join(", ")} and ${course.subjects[course.subjects.length - 1]}`
        : course.subjects[0];
    const benefits = [
      "Personalised One-to-One Learning",
      course.mentorshipBenefit,
      "Instant Doubt Solving",
      course.preparationBenefit,
      "Regular Assessments & Progress Tracking",
    ];

    this.innerHTML = `
      <section class="application-hero course-track-hero" data-course="${course.slug}">
        <div class="container course-track-hero-grid">
          <div class="course-track-hero-copy">
            <span class="eyebrow">${course.heroLabel}</span>
            <h1>${course.title} Course</h1>
            <div class="course-track-tags" aria-label="${course.title} tracks">
              ${course.heroTags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <div class="course-track-tags course-track-tags-subtle" aria-label="Classes and subjects">
              ${[...course.classTags, ...course.subjects]
                .map((item) => `<span>${item}</span>`)
                .join("")}
            </div>
            <h2>One to One Online Classes with ${course.mentorLabel}</h2>
           <div class="btn-box">
                 <a href="for-parents.html" class="btn btn-primary">Ask about this course</a>
                 <a href="courses.html" class="btn btn-outline arrow">View all courses
                    <span aria-hidden="true">▶</span>
                 </a>
           </div>
          </div>
          <div class="course-track-hero-visual" aria-hidden="true"></div>
        </div>
      </section>
      <section class="page-section course-track-benefits">
        <div class="container course-track-benefits-layout">
          <div class="course-track-benefits-copy">
            <span class="eyebrow">A personal learning plan</span>
            <h2 class="section-title">Make progress with the right support.</h2>
            <p>Build confidence in ${subjects} with focused guidance for every step of your ${course.title} preparation.</p>
            <ol class="course-track-benefits-list">
              ${benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
            </ol>
            <a href="for-parents.html" class="btn btn-primary">Ask about this course</a>
          </div>
          <figure class="course-track-art">
            <img src="${course.art}" alt="Illustration representing ${course.title} learning" loading="lazy">
            <figcaption>One-to-one learning, focused on your goals.</figcaption>
          </figure>
        </div>
      </section>
    `;
  }
}

customElements.define("course-detail", CourseDetail);

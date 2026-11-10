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

    this.innerHTML = `
      <section class="application-hero course-hero">
        <div class="container">
          <span class="eyebrow">${course.category}</span>
          <h1>${course.title} tutoring, tailored to you.</h1>
          <p>${course.description}</p>
          <div class="page-actions">
            <a href="for-parents.html" class="btn btn-primary">Find ${course.title} support</a>
            <a href="courses.html" class="btn btn-outline">All courses</a>
          </div>
        </div>
      </section>
      <section class="page-section course-detail-section">
        <div class="container course-detail-layout">
          <div class="course-detail-copy">
            <span class="eyebrow">A personal learning plan</span>
            <h2 class="section-title">Make progress with the right support.</h2>
            <p>${course.focus} Your tutor can adapt lessons to your current level, learning style and goals.</p>
            <h3>Subjects we can help with</h3>
            <ul class="course-subject-list">
              ${course.subjects.map((subject) => `<li>${subject}</li>`).join("")}
            </ul>
            <a href="for-parents.html" class="btn btn-primary">Ask about this course</a>
          </div>
          <figure class="course-detail-art">
            <img src="images/${course.art}" alt="Illustration representing ${course.title} learning">
            <figcaption>One-to-one learning, focused on your goals.</figcaption>
          </figure>
        </div>
      </section>
      <section class="page-section course-related-section">
        <div class="container">
          <div class="section-head">
            <div><span class="eyebrow">Keep exploring</span><h2 class="section-title">Related courses</h2></div>
            <a href="courses.html" class="btn btn-outline">View all courses</a>
          </div>
          <div class="related-course-links">
            ${course.related
              .map((slug) => {
                const related = courseTracks.find(
                  (track) => track.slug === slug,
                );
                return `<a href="course-${related.slug}.html">${related.title}<span aria-hidden="true">→</span></a>`;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("course-detail", CourseDetail);

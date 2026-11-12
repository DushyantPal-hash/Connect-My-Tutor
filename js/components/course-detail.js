import { courseTracks } from "../course-data.js";
import { learnerExperiences } from "../experience-data.js";
import { tutors } from "../tutor-data.js";

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
    const relatedTutors = tutors.filter((tutor) =>
      tutor.courseSlugs.includes(course.slug),
    );

    this.innerHTML = `
      <section class="application-hero course-hero">
        <div class="container">
          <span class="eyebrow">${course.category}</span>
          <h1>${course.title} tutoring, tailored to you.</h1>
          <p>${course.description}</p>
          <div class="page-actions">
            <a href="for-parents.html" class="btn btn-primary">Find ${course.title} support</a>
            <a href="courses.html" class="btn btn-outline-black">All courses</a>
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
            <div><span class="eyebrow">Meet your learning partner</span><h2 class="section-title">Tutors for ${course.title}</h2></div>
            <a href="tutors.html" class="btn btn-outline">All tutors</a>
          </div>
          <div class="tutors-grid course-related-tutors">
            ${relatedTutors.length
              ? relatedTutors
                  .map(
                    (tutor) => `
                <a class="tutor" href="tutor.html?tutor=${tutor.slug}">
                  <div class="tutor-photo ${tutor.imageClass}">
                    <img src="${tutor.image}" alt="${tutor.name}, ${tutor.subject} tutor">
                    <small>${tutor.subject}</small>
                  </div>
                  <div class="tutor-body">
                    <h2>${tutor.name}</h2>
                    <div class="tutor-meta"><span>${tutor.expertise} · ${tutor.experience}</span><span class="rating">★ ${tutor.rating}</span></div>
                    <span class="course-link">View profile <span aria-hidden="true">▶</span></span>
                  </div>
                </a>
              `,
                  )
                  .join("")
              : '<p>Contact us and we will help you find a tutor for this course.</p>'}
          </div>
        </div>
      </section>
      <section class="page-section learner-experiences">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">Stories from across our community</span>
              <h2 class="section-title">Learner &amp; parent experiences</h2>
              <p class="section-sub">These shared experiences reflect families' wider experience with Connect My Tutor.</p>
            </div>
          </div>
          <div class="quotes">
            ${learnerExperiences
              .map(
                (experience) => `
              <article class="quote">
                <div class="quote-rating" aria-label="5 out of 5 stars">★★★★★</div>
                <p>${experience.quote}</p>
                <div class="quote-who">
                  <div class="avatar ${experience.avatarClass}">${experience.avatar}</div>
                  <div><b>${experience.name}</b><span>${experience.relationship}</span></div>
                </div>
              </article>
            `,
              )
              .join("")}
          </div>
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
                return `<a href="course-${related.slug}.html">${related.title}<span aria-hidden="true">▶</span></a>`;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("course-detail", CourseDetail);

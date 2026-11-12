import { courseTracks } from "../course-data.js";
import { learnerExperiences } from "../experience-data.js";
import { tutors } from "../tutor-data.js";

class TutorDetail extends HTMLElement {
  connectedCallback() {
    const slug = new URLSearchParams(location.search).get("tutor");
    const tutor = tutors.find((item) => item.slug === slug);

    if (!tutor) {
      this.innerHTML = `
        <div class="container course-not-found">
          <h1>Tutor not found</h1>
          <p>We could not find this tutor. Browse the tutor directory to explore available educators.</p>
          <a class="btn btn-primary" href="tutors.html">Browse tutors</a>
        </div>
      `;
      return;
    }

    const relatedCourses = courseTracks.filter((course) =>
      tutor.courseSlugs.includes(course.slug),
    );

    document.title = `${tutor.name} — Tutor Profile — Connect My Tutor`;
    this.innerHTML = `
      <section class="application-hero tutor-profile-hero">
        <div class="container tutor-profile-heading">
          <img src="${tutor.image}" alt="${tutor.name}, ${tutor.subject} tutor">
          <div>
            <span class="eyebrow">${tutor.subject} tutor</span>
            <h1>${tutor.name}</h1>
            <p>${tutor.expertise} · ${tutor.experience} teaching experience · <span class="rating">★ ${tutor.rating}</span></p>
            <div class="page-actions">
              <a href="for-parents.html" class="btn btn-primary">Enquire about ${tutor.name}</a>
              <a href="tutors.html" class="btn btn-outline-black">All tutors</a>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section">
        <div class="container tutor-profile-layout">
          <div class="tutor-profile-copy">
            <span class="eyebrow">Teaching approach</span>
            <h2 class="section-title">A learning plan shaped around the student.</h2>
            <p>${tutor.bio}</p>
            <h3>Subjects</h3>
            <ul class="course-subject-list">
              ${tutor.subjects.map((subject) => `<li>${subject}</li>`).join("")}
            </ul>
          </div>
          <aside class="tutor-profile-facts">
            <span class="eyebrow">At a glance</span>
            <p><strong>Specialty</strong>${tutor.expertise}</p>
            <p><strong>Experience</strong>${tutor.experience}</p>
            <p><strong>Student rating</strong>★ ${tutor.rating} / 5</p>
          </aside>
        </div>
      </section>
      <section class="page-section course-related-section">
        <div class="container">
          <div class="section-head">
            <div><span class="eyebrow">Course support</span><h2 class="section-title">Courses ${tutor.name} can help with</h2></div>
            <a href="courses.html" class="btn btn-outline">All courses</a>
          </div>
          <div class="related-course-links">
            ${relatedCourses.length
              ? relatedCourses
                  .map(
                    (course) =>
                      `<a href="course-${course.slug}.html">${course.title}<span aria-hidden="true">▶</span></a>`,
                  )
                  .join("")
              : "<p>Contact us to discuss course options with this tutor.</p>"}
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
          ${renderExperiences()}
        </div>
      </section>
    `;
  }
}

function renderExperiences() {
  return `
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
  `;
}

customElements.define("tutor-detail", TutorDetail);

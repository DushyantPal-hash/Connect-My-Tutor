import { courseTracks } from "../course-data.js";

class CourseCatalog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="course-grid course-directory-grid">
        ${courseTracks
          .map(
            (course) => `
          <a class="course-card course-directory-card" href="course-${course.slug}.html">
            <img class="course-card-image" src="images/${course.art}" alt="" loading="lazy">
            <span class="course-type">${course.category}</span>
            <h2>${course.title}</h2>
            <p>${course.summary}</p>
            <span class="course-link">Explore course <span aria-hidden="true">▶</span></span>
          </a>
        `,
          )
          .join("")}
      </div>
    `;
  }
}

customElements.define("course-catalog", CourseCatalog);

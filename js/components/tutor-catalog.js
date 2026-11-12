import { tutors } from "../tutor-data.js";

class TutorCatalog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tutors-grid">
        ${tutors
          .map(
            (tutor) => `
          <a class="tutor" href="tutor.html?tutor=${tutor.slug}" aria-label="View ${tutor.name}'s tutor profile">
            <div class="tutor-photo ${tutor.imageClass}">
              <img src="${tutor.image}" alt="${tutor.name}, ${tutor.subject} tutor" />
              <small>${tutor.subject}</small>
            </div>
            <div class="tutor-body">
              <h2>${tutor.name}</h2>
              <div class="tutor-meta">
                <span> ${tutor.experience}</span>
                <span class="rating" aria-label="Rated ${tutor.rating} out of 5">★ ${tutor.rating}</span>
              </div>
              <span class="course-link">View tutor profile <span aria-hidden="true">▶</span></span>
            </div>
          </a>
        `,
          )
          .join("")}
      </div>
    `;
  }
}

customElements.define("tutor-catalog", TutorCatalog);

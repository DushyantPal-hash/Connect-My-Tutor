class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header id="header">
        <div class="container nav">
          <a href="/" class="logo">
          <img src="images/logo/logo.webp" alt="Connect My Tutor Logo" class="logo-image">
          Connect My Tutor
          </a>
          <ul class="nav-links" id="navLinks">
            <li><a href="about.html">About</a></li>
            <li><a href="courses.html">Courses</a></li>
            <li><a href="for-parents.html">For parents</a></li>
            <li><a href="become-a-tutor.html">Become a tutor</a></li>
            <li><a href="tutors.html">Find tutors</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
          <div class="nav-cta">
            <a href="how-it-works.html" class="btn btn-outline">How it works</a>
            <a href="tutors.html" class="btn btn-primary">Find a tutor</a>
            <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    `;

    const currentPage = location.pathname.split("/").pop() || "/";
    this.querySelectorAll(".nav-links a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }
}

customElements.define("site-header", SiteHeader);

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header id="header">
        <div class="container nav">
          <a href="/" class="logo">
            <img src="images/logo/finnal-logo.svg" alt="Connect My Tutor" class="logo-image" width="164" height="50">
          </a>
          <ul class="nav-links" id="navLinks">
            <li><a href="/#courses">Courses</a></li>
            <li><a href="for-parents.html">For Parents</a></li>
            <li><a href="become-a-tutor.html">Become a Tutor</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li class="hide-in-desktop"><a href="how-it-works.html">How it Works</a></li>
          </ul>
          <div class="nav-cta">
            <a href="how-it-works.html" class="btn btn-outline">How it Works</a>
            <a href="for-tutors.html" class="btn btn-primary">Find a Tutor</a>
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

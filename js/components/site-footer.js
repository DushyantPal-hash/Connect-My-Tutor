class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="floating-social-links" aria-label="Social media">
      <a href="https://www.linkedin.com/company/connectmytutor/" class="linkedin" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
      </a>
      <a href="https://www.instagram.com/connectmytutor" class="instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-instagram" aria-hidden="true"></i>
      </a>
      <a href="https://www.facebook.com/share/14pEmyShQ2H/" class="facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
      </a>
      <a href="https://wa.me/919820798275" class="whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
      </a>
    </nav>
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand-column">
            <a href="/" class="logo footer-brand">
              <img src="images/logo/finnal-logo.svg" alt="Connect My Tutor" class="logo-image" width="164" height="50">
            </a>
           <div class="card">
              <p>
                <span>One Teacher.</span>
                <span>One Student.</span>
                <span class="highlite">Unlimited Growth.</span>
                <div class="divider">
                  <div class="line"></div>
                  <div class="dot"></div>
                  <div class="line"></div>
                </div>
                <span>Anywhere. Anytime.</span>
              </p>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <a href="how-it-works.html"><li>How it works</li></a>
              <a href="contact.html"><li>Contact us</li></a>
            </ul>
          </div>
          <div>
            <h4>Academic tracks</h4>
            <ul>
              <a href="courses.html"><li>All courses</li></a>
              <a href="course-ib.html"><li>IB</li></a>
              <a href="course-igcse.html"><li>IGCSE</li></a>
              <a href="course-boardprep.html"><li>BoardPrep</li></a>
            </ul>
          </div>
          <div>
            <h4>Exam preparation</h4>
            <ul>
              <a href="course-jee.html"><li>JEE</li></a>
              <a href="course-neet.html"><li>NEET</li></a>
              <a href="course-sat.html"><li>SAT</li></a>
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <ul>
              <a href="for-parents.html"><li>Hire a Tutor</li></a>
              <a href="for-tutors.html"><li>Register as Tutor</li></a>
            </ul> <div class="foot-social">
              <div class="social-links">
                <a href="https://www.linkedin.com/company/connectmytutor/" class="linkedin" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.instagram.com/connectmytutor" class="instagram" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/share/14pEmyShQ2H/" class="facebook" aria-label="Facebook">
                  <i class="si si-facebook"></i>
                </a>
              </div>
            </div>
            </div>
          </div>
        <div class="footer-bottom">
          <span>© 2026 Connect My Tutor. All rights reserved.</span>
          <a href="contact.html">Questions? Get in touch</a>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define("site-footer", SiteFooter);

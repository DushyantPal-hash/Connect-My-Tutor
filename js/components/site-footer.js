class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand-column">
            <a href="/" class="logo footer-brand">
              <img src="images/logo/favicon.png" alt="Connect My Tutor Logo" class="logo-image">
              Connect My Tutor
            </a>
            <p>Thoughtful tutoring for brighter futures. Online and in-person learning, shaped around every student.</p>
            <div class="foot-social">
              <div class="social-links">
                <a href="https://www.linkedin.com" class="linkedin" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com" class="youtube" aria-label="YouTube">
                  <i class="fab fa-youtube"></i>
                </a>
                <a href="https://www.facebook.com" class="facebook" aria-label="Facebook">
                  <i class="si si-facebook"></i>
                </a>
                <a href="https://www.instagram.com" class="instagram" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://x.com" class="twitter" aria-label="X">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <a href="about.html"><li>About us</li></a>
              <a href="tutors.html"><li>Find a tutor</li></a>
              <a href="how-it-works.html"><li>How it works</li></a>
              <a href="contact.html"><li>Contact us</li></a>
              <a href="faqs.html"><li>FAQs</li></a>
            </ul>
          </div>
          <div>
            <h4>For students</h4>
            <ul>
              <a href="courses.html"><li>All courses</li></a>
              <a href="for-parents.html"><li>Student enquiry form</li></a>
              <a href="course-foundation.html"><li>Foundation</li></a>
              <a href="course-boardprep.html"><li>BoardPrep</li></a>
              <a href="for-parents.html"><li>Online courses</li></a>
            </ul>
          </div>
          <div>
            <h4>Academic tracks</h4>
            <ul>
              <a href="course-ib.html"><li>IB</li></a>
              <a href="course-igcse.html"><li>IGCSE</li></a>
              <a href="course-aqa.html"><li>AQA</li></a>
              <a href="course-pearson-edexcel.html"><li>Pearson Edexcel</li></a>
            </ul>
          </div>
          <div>
            <h4>Exam preparation</h4>
            <ul>
              <a href="course-sat.html"><li>SAT</li></a>
              <a href="course-act.html"><li>ACT</li></a>
              <a href="course-aps.html"><li>APs</li></a>
              <a href="course-jee.html"><li>JEE</li></a>
              <a href="course-neet.html"><li>NEET</li></a>
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <ul>
              <a href="for-tutors.html"><li>Teacher application</li></a>
              <a href="for-parents.html"><li>Student form</li></a>
              <a href="tutors.html?subject=Mathematics"><li>Mathematics</li></a>
              <a href="tutors.html?subject=Physics"><li>Sciences</li></a>
              <a href="contact.html"><li>Email us</li></a>
            </ul>
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

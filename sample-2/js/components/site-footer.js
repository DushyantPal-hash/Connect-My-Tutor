class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand-column">
            <a href="index.html" class="logo footer-brand">
              <span class="logo-mark">✦</span>
              Connect My Tutor
            </a>
            <p>Thoughtful tutoring for brighter futures. Online and in-person learning, shaped around every student.</p>
            <div class="foot-social">
              <div class="social-links">
                <a href="https://www.linkedin.com/company/letstawk/" class="linkedin" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/@letstawkai" class="youtube" aria-label="YouTube">
                  <i class="fab fa-youtube"></i>
                </a>
                <a href="https://www.facebook.com/letstawkai" class="facebook" aria-label="Facebook">
                  <i class="si si-facebook"></i>
                </a>
                <a href="https://x.com/letstawkai" class="twitter" aria-label="X">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/" class="instagram" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About us</a></li>
              <li><a href="tutors.html">Find a tutor</a></li>
              <li><a href="how-it-works.html">How it works</a></li>
              <li><a href="contact.html">Contact us</a></li>
              <li><a href="faqs.html">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4>For students</h4>
            <ul>
              <li><a href="courses.html">All courses</a></li>
              <li><a href="for-parents.html">Student enquiry form</a></li>
              <li><a href="course-foundation.html">Foundation</a></li>
              <li><a href="course-boardprep.html">BoardPrep</a></li>
              <li><a href="for-parents.html">Online courses</a></li>
            </ul>
          </div>
          <div>
            <h4>Academic tracks</h4>
            <ul>
              <li><a href="course-ib.html">IB</a></li>
              <li><a href="course-igcse.html">IGCSE</a></li>
              <li><a href="course-aqa.html">AQA</a></li>
              <li><a href="course-pearson-edexcel.html">Pearson Edexcel</a></li>
            </ul>
          </div>
          <div>
            <h4>Exam preparation</h4>
            <ul>
              <li><a href="course-sat.html">SAT</a></li>
              <li><a href="course-act.html">ACT</a></li>
              <li><a href="course-aps.html">APs</a></li>
              <li><a href="course-jee.html">JEE</a></li>
              <li><a href="course-neet.html">NEET</a></li>
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <ul>
              <li><a href="for-tutors.html">Teacher application</a></li>
              <li><a href="for-parents.html">Student form</a></li>
              <li><a href="tutors.html?subject=Mathematics">Mathematics</a></li>
              <li><a href="tutors.html?subject=Physics">Sciences</a></li>
              <li><a href="contact.html">Email us</a></li>
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

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <footer>
          <div class="container">
            <div class="footer-grid">
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div class="foot-logo">
                  <a href="/" class="logo footer-brand">
                    <span class="logo-mark">✦</span>
                    Connect My Tutor
                  </a>
                  <p>Hand-picked tutors, remarkable results. Online and in-person lessons tailored to every learner.</p>
                </div>
                <div class="foot-social">
                  <div class="social-links">
                    <a href="https://www.linkedin.com/company/letstawk/" class="linkedin">
                      <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.youtube.com/@letstawkai" class="youtube">
                      <i class="fab fa-youtube"></i>
                    </a>
                    <a href="https://www.facebook.com/letstawkai" class="facebook">
                      <i class="si si-facebook"></i>
                    </a>
                    <a href="https://x.com/letstawkai" class="twitter">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="threads">
                      <i class="si si-threads"></i>
                    </a>
                    <a href="#" class="instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="pinterest">
                      <i class="fab fa-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h4>Platform</h4>
                <ul>
                  <li><a href="about.html">About us</a></li>
                  <li><a href="tutors.html">Find a tutor</a></li>
                  <li><a href="for-parents.html">For parents</a></li>
                  <li><a href="for-tutors.html">For tutors</a></li>
                </ul>
              </div>
              <div>
                <h4>Subjects</h4>
                <ul>
                  <li><a href="tutors.html?subject=Mathematics">Mathematics</a></li>
                  <li><a href="tutors.html?subject=Physics">Sciences</a></li>
                  <li><a href="tutors.html?subject=English">English</a></li>
                  <li><a href="tutors.html?subject=Computer%20Science">Computer Science</a></li>
                </ul>
              </div>
              <div>
                <h4>Support</h4>
                <ul>
                  <li><a href="contact.html">Contact us</a></li>
                  <li><a href="faqs.html">FAQs</a></li>
                  <li><a href="how-it-works.html">How it works</a></li>
                  <li><a href="contact.html">First lesson guarantee</a></li>
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

import './components/site-header.js';
import './components/site-footer.js';

const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 30);
});

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('show', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  });
});

const marquee = document.getElementById('marquee');
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

document.querySelectorAll('form[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    form.querySelectorAll('[data-required-group]').forEach((group) => {
      const selected = group.querySelectorAll('input[type="checkbox"]:checked').length;
      const minimum = Number(group.dataset.minSelections || 0);
      const maximum = Number(group.dataset.maxSelections || Infinity);
      const error = group.querySelector('[data-group-error]');
      const isInvalid = selected < minimum || selected > maximum;

      error.hidden = !isInvalid;
      group.setAttribute('aria-invalid', String(isInvalid));
      if (isInvalid) {
        error.textContent = selected > maximum
          ? `Please select no more than ${maximum} options.`
          : 'Please select at least one option.';
      }
    });

    const invalidGroup = form.querySelector('[data-required-group][aria-invalid="true"]');
    if (invalidGroup) {
      invalidGroup.querySelector('input[type="checkbox"]').focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const successMessage = form.querySelector('.form-success');
    successMessage.hidden = false;
    form.querySelector('button[type="submit"]').textContent = 'Form checked ✓';
    form.querySelectorAll('input, select, textarea, button').forEach((element) => {
      element.disabled = true;
    });
  });
});

document.querySelectorAll('[data-required-group] input[type="checkbox"]').forEach((input) => {
  input.addEventListener('change', () => {
    const group = input.closest('[data-required-group]');
    const selected = group.querySelectorAll('input[type="checkbox"]:checked').length;
    const minimum = Number(group.dataset.minSelections || 0);
    const maximum = Number(group.dataset.maxSelections || Infinity);
    const error = group.querySelector('[data-group-error]');
    const isInvalid = selected < minimum || selected > maximum;

    group.setAttribute('aria-invalid', String(isInvalid));
    error.hidden = !isInvalid;
    if (isInvalid) {
      error.textContent = selected > maximum
        ? `Please select no more than ${maximum} options.`
        : 'Please select at least one option.';
    }
  });
  input.closest('[data-required-group]').setAttribute('aria-required', 'true');
});

const tutorSearch = document.getElementById('tutorSearch');
if (tutorSearch) {
  const tutorCards = [...document.querySelectorAll('.tutors-grid .tutor')];
  const params = new URLSearchParams(location.search);
  tutorSearch.value = params.get('subject') || '';

  const filterTutors = () => {
    const query = tutorSearch.value.trim().toLowerCase();
    tutorCards.forEach((card) => {
      card.hidden = !card.textContent.toLowerCase().includes(query);
    });
    document.getElementById('noTutors').hidden = tutorCards.some((card) => !card.hidden);
  };

  tutorSearch.addEventListener('input', filterTutors);
  filterTutors();
}

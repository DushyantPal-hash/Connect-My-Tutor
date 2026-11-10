# Connect My Tutor

A responsive tutoring website built with plain HTML, CSS, and JavaScript. No build step or package installation is required.

## Project structure

```text
.
├── index.html
├── about.html
├── tutors.html
├── how-it-works.html
├── contact.html
├── become-a-tutor.html
├── for-tutors.html
├── for-parents.html
├── faqs.html
├── css/
│   └── styles.css
└── js/
    ├── main.js
    └── components/
        ├── site-header.js
        └── site-footer.js
```

The header and footer are reusable custom elements shared across every page. Shared page styles live in `css/main.css`, and interactions such as the mobile menu, tutor search, and demo form confirmations are initialized from `js/main.js`.

The contact, tutor application, and parent enquiry forms are frontend demos only. Connect them to a form service or backend before collecting real submissions. Contact details and any business claims should also be reviewed and updated before launch.

## Run locally

Serve this folder with any static file server so the browser can load the JavaScript modules. For example, run `python -m http.server` from the project folder and open `http://localhost:8000`.

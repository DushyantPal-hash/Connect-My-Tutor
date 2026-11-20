# Connect My Tutor

A responsive tutoring website built with plain HTML, CSS, and JavaScript. No build step or package installation is required.

## Project structure

```text
.
├── *.html
├── css/
│   ├── main.css
│   ├── theme.css
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── sections/
│   └── utilities/
├── images/
└── js/
    ├── main.js
    ├── *-data.js
    └── components/
        ├── site-header.js
        └── site-footer.js
```

The header and footer are reusable custom elements shared across every page. Shared page styles live in `css/main.css`, and interactions such as the mobile menu, tutor search, and form submissions are initialized from `js/main.js`.

The home, contact, tutor-interest, tutor-application, and parent-enquiry forms submit through FormSubmit to `connectmytutor@gmail.com`. FormSubmit is a third-party service that processes submitted details. Before submissions can be delivered, confirm the activation email sent to that inbox after the first submission. Each email includes the page title and path where the form was submitted. IIT name and JEE rank are requested only when a tutor selects “Yes” for the IIT question.

## Run locally

Serve this folder with any static file server so the browser can load the JavaScript modules. For example, run `python -m http.server` from the project folder and open `http://localhost:8000`.

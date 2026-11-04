# Implementation Plan: portfolio-react-conversion

## Overview

Convert Mahlet Chanyalew's static HTML/CSS portfolio into a Vite + React SPA. Each task builds incrementally on the previous one, ending with all components wired together in `App.jsx`. All original CSS class names are preserved exactly. JS interactivity (hamburger nav toggle, contact form state) is implemented with React `useState` hooks. Tests use Vitest + React Testing Library + fast-check.

---

## Tasks

- [x] 1. Scaffold Vite + React project and configure global assets
  - Run `npm create vite@latest` with the React template inside the repo root (or a `portfolio-app/` subdirectory as agreed).
  - Copy all files from `image/` into `src/assets/`.
  - Add the Font Awesome kit `<script src="https://kit.fontawesome.com/aacfa46e5f.js" crossorigin="anonymous"></script>` to `index.html` before `</body>`.
  - Add Google Fonts `<link>` tags for Playfair Display and PT Serif to `<head>` in `index.html`.
  - Replace the generated `src/index.css` with global styles extracted from `css/home.css`: CSS reset (`* { margin:0; padding:0; box-sizing:border-box }`), `html { scroll-behavior: smooth }`, `body`, and `.container` rules.
  - Remove the Vite boilerplate content from `App.jsx` and `App.css`; leave `App.jsx` as a bare shell returning `null`.
  - Verify `npm run dev` starts without errors and `npm run build` produces a `dist/` folder.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 2. Implement the Navbar component with hamburger toggle state
  - Create `src/components/Navbar/Navbar.jsx` and `src/components/Navbar/Navbar.css`.
  - Copy the nav-related CSS rules from `css/home.css` (`.nav`, `.nav-container`, `.logo`, `.nav-menu`, `.nav-item`, `.nav-link`, `.nav-toggle`, `.bar`, and all their responsive variants) into `Navbar.css`.
  - Implement `Navbar.jsx`:
    - Declare `const [menuOpen, setMenuOpen] = useState(false)`.
    - `toggleMenu` sets `menuOpen` to its inverse; `closeMenu` sets it to `false`.
    - Apply `className={`nav-toggle${menuOpen ? ' active' : ''}`}` to the hamburger `<div>`.
    - Apply `className={`nav-menu${menuOpen ? ' active' : ''}`}` to the `<ul>`.
    - Add `aria-label="Toggle navigation"` and `aria-expanded={menuOpen}` to the toggle `<div>` (also add `role="button"` and `tabIndex={0}`).
    - Each `<a className="nav-link">` calls `closeMenu` via `onClick`.
    - Nav links: Home (`href="#header"`), About Me (`href="#about"`), Skills (`href="#skills"`), Projects (`href="#projects"`), Contacts (`href="#contacts"`).
    - Logo: `<h3><span>M</span>ahlet</h3>`.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 11.1, 11.2_

  - [ ]* 2.1 Write property tests for Navbar toggle behaviour
    - **Property 1: Hamburger toggle synchronises CSS class and ARIA state** — for any sequence of toggle clicks, `active` class and `aria-expanded` always reflect `menuOpen`.
    - **Property 2: Clicking any nav link closes the menu** — for any nav link clicked while menu is open, menu closes.
    - Use fast-check `fc.integer({ min: 1, max: 20 })` to generate click-count sequences.
    - Assert `aria-expanded` equals `String(menuOpen)` after each click.
    - Assert menu `<ul>` does/does not have class `active` consistently.
    - **Validates: Requirements 3.5, 3.6, 11.2**

- [ ] 3. Implement the Home section component
  - Create `src/components/Home/Home.jsx` and `src/components/Home/Home.css`.
  - Copy the hero/header CSS rules from `css/home.css` (`.header`, `.hero`, `.hero-content`, `.name`, `.link`, `.hero-image`, `@keyframes fadeIn`, `@keyframes float`, and their responsive variants) into `Home.css`.
  - Import `profileImg` from `../../assets/pic 2.jpg`.
  - Render `<header id="header" className="header">` containing a `.hero > .hero-content` layout:
    - Left `.name`: heading `Hi, I'm <span>Mahlet</span>`, subheading `A Front-End Web Developer`, bio paragraph, and `.link > <a href="#contacts">Contact me</a>`.
    - Right `.hero-image`: `<img src={profileImg} alt="Mahlet Profile" />`.
  - No JS state needed; `float` and `fadeIn` animations are CSS-only.
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.1, 10.2, 10.3, 11.3_

- [ ] 4. Implement the About section component
  - Create `src/components/About/About.jsx` and `src/components/About/About.css`.
  - Copy all rules from `css/about.css` into `About.css` (including `@keyframes float` — it is safe to duplicate since each CSS file is scoped to its component).
  - Import `aboutImg` from `../../assets/new.jpg`.
  - Render `<section id="about" className="about">` with `.container > .main`:
    - Left `.image`: `<img src={aboutImg} alt="About Mahlet" />`.
    - Right `.head`: heading `<span>About</span> Me`, subheading `Front-End <span>Developer</span>`, full about-me paragraph, and `.linkk > <a href="#projects">Read More</a>`.
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 10.1, 10.2, 10.3, 11.4_

- [ ] 5. Implement the Skills section component
  - Create `src/components/Skills/Skills.jsx` and `src/components/Skills/Skills.css`.
  - Copy all rules from `css/skills.css` into `Skills.css`.
  - Define the static `skillCategories` array inside `Skills.jsx`:
    ```js
    const skillCategories = [
      { title: 'Technical Skills', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design'] },
      { title: 'Experience', items: ['Creating websites for Hotels', 'Developing portfolio websites', 'Company website development'] },
      { title: 'Education', items: ['Software Engineering at Wollo University', 'Andalus Coding Academy', 'Udacity Online Courses'] },
    ];
    ```
  - Render `<section id="skills" className="skills">` with `.container > .start` heading and `.box` containing one `.heading` card per category, each mapping `items` to `.skill-item` divs inside `.skill-items`.
  - Staggered hover reveal is CSS-only via `transition-delay` on `.skill-item:nth-child(n)`.
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 10.2_

  - [ ]* 5.1 Write unit tests for Skills rendering
    - Assert all three category titles ("Technical Skills", "Experience", "Education") are present in the DOM.
    - Assert all skill items from each category are rendered.
    - _Requirements: 6.3, 6.4, 6.5, 6.6_

- [ ] 6. Implement the Projects section component
  - Create `src/components/Projects/Projects.jsx` and `src/components/Projects/Projects.css`.
  - Copy all rules from `css/projects.css` into `Projects.css`.
  - Import the three project images: `phoneImg` (`phone.jpg`), `mobileImg` (`mobile.png`), `portfolioImg` (`photo 2 (2).jpg`).
  - Define the static `projects` array inside `Projects.jsx`:
    ```js
    const projects = [
      { image: phoneImg, alt: 'Hotel Website Project', title: 'Website Development For Hotels', description: 'Creating a Website for Hotels and Restaurants with beautiful design. Users can reserve services anytime, anywhere.' },
      { image: mobileImg, alt: 'Company Website Project', title: 'Developing Websites for Companies', description: 'Creating professional websites for companies to enhance their online presence and improve customer experience.' },
      { image: portfolioImg, alt: 'Portfolio Website Project', title: 'Developing Portfolio Websites', description: 'Creating personal portfolio websites with modern, responsive designs that showcase skills and projects effectively.' },
    ];
    ```
  - Render `<section id="projects" className="projects">` with `.container > .pro-head` heading and `.main-content` containing one `.work` card per project (image + `.layer` overlay with title and description).
  - Hover overlay slide-up and image scale are CSS-only.
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 10.2, 11.5_

  - [ ]* 6.1 Write property test for project card alt attributes
    - **Property 4: Every project card image has a non-empty alt attribute** — for every rendered `.work img`, `alt` is a non-empty string.
    - Render `<Projects />` and query all `img` elements; assert each has a truthy `alt`.
    - **Validates: Requirements 11.5**

- [ ] 7. Implement the ContactForm sub-component
  - Create `src/components/Contact/ContactForm.jsx`.
  - Declare four `useState` hooks: `name`, `email`, `message` (all `''`), and `submitted` (`false`).
  - Render a controlled `<form>` with:
    - `<input type="text" value={name} onChange={...} placeholder="Your Name" required />`
    - `<input type="email" value={email} onChange={...} placeholder="Your Email" required />`
    - `<textarea value={message} onChange={...} rows="5" placeholder="Enter Your Message..." required />`
    - `<button type="submit">Submit</button>`
  - `onSubmit` handler: `e.preventDefault(); setSubmitted(true);`
  - When `submitted` is `true`, return `<div className="success-message">Thank you! Your message has been sent.</div>` instead of the form.
  - _Requirements: 8.6, 8.7, 8.8_

  - [ ]* 7.1 Write property test for ContactForm submission
    - **Property 3: Contact form submission shows success message for any valid input** — for any non-empty name, valid email, and non-empty message, submitting the form replaces it with the success message and removes the form from the DOM.
    - Use fast-check `fc.string({ minLength: 1 })` for name/message and `fc.emailAddress()` for email.
    - Simulate filling fields and submitting; assert success message is present and form is absent.
    - **Validates: Requirements 8.7**

- [ ] 8. Implement the Contact section component
  - Create `src/components/Contact/Contact.jsx` and `src/components/Contact/Contact.css`.
  - Copy all rules from `css/contact.css` into `Contact.css`; add a `.success-message` rule (e.g., `color: green; font-size: 18px; padding: 20px; text-align: center;`).
  - Define the static `socialLinks` array inside `Contact.jsx`:
    ```js
    const socialLinks = [
      { href: 'https://t.me/Hemennnnnn', icon: 'fa fa-telegram', label: 'Telegram' },
      { href: 'https://www.instagram.com/hema.chh/', icon: 'fa fa-instagram', label: 'Instagram' },
      { href: 'https://www.linkedin.com/in/mahlet-chanyalew-8301b9358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: 'fa fa-linkedin', label: 'LinkedIn' },
      { href: 'https://github.com/Mahlett2', icon: 'fa fa-github', label: 'GitHub' },
    ];
    ```
  - Render `<section id="contacts" className="contacts">` with `.container > .main-head` heading and `.contact-content`:
    - Left `.content-left`: phone link, email link (both with Font Awesome `<i>` icons), and `.social-media` div mapping `socialLinks` to `<a aria-label={label}>` elements.
    - Right `.content-right`: `<ContactForm />`.
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.9, 11.6_

  - [ ]* 8.1 Write property test for social media aria-labels
    - **Property 5: Every social media link has a non-empty aria-label** — for every `<a>` in `.social-media`, `aria-label` is a non-empty string.
    - Render `<Contact />` and query all social anchor elements; assert each has a truthy `aria-label`.
    - **Validates: Requirements 11.6**

- [ ] 9. Implement the Footer component
  - Create `src/components/Footer/Footer.jsx` and `src/components/Footer/Footer.css`.
  - Copy the `footer` CSS rule from `css/contact.css` into `Footer.css`.
  - Render `<footer><div className="container"><p>© 2024 Mahlet Chanyalew - All Rights Reserved.</p></div></footer>`.
  - _Requirements: 9.1, 9.2_

- [ ] 10. Wire all components together in App.jsx and verify the full page
  - Import and render all seven components in `App.jsx` in document order: `Navbar`, `Home`, `About`, `Skills`, `Projects`, `Contact`, `Footer`.
  - Import `./index.css` in `main.jsx` (global styles).
  - Confirm `index.html` has the Font Awesome kit script and Google Fonts link tags.
  - Confirm `src/index.css` contains the global reset, `html { scroll-behavior: smooth }`, `body`, and `.container` rules — and that these rules are **removed** from any component CSS file to avoid duplication.
  - Run `npm run build` and confirm it exits with no errors.
  - _Requirements: 1.5, 1.7, 2.1, 2.2, 2.3, 2.4, 2.5, 10.4, 10.5_

  - [ ]* 10.1 Write smoke test for App rendering
    - Render `<App />` and assert all seven section landmarks are present: `header#header`, `section#about`, `section#skills`, `section#projects`, `section#contacts`, `footer`.
    - _Requirements: 2.1_

- [ ] 11. Final checkpoint — ensure all tests pass
  - Run `npx vitest --run` and confirm all tests pass with zero failures.
  - Fix any failing tests before proceeding.
  - Ask the user if any questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP.
- Each task references specific requirements for traceability.
- Property tests use **fast-check** with a minimum of 100 iterations per property.
- Unit/component tests use **Vitest + React Testing Library**.
- CSS class names from the original files are preserved exactly — do not rename them.
- The `float` keyframe is defined in both `Home.css` and `About.css`; this duplication is intentional since each CSS file is component-scoped.
- Font Awesome and Google Fonts are loaded via `index.html` tags, not npm packages.
- Images with spaces in their filenames (e.g., `photo 2 (2).jpg`) must be imported via `import` statements in JSX — Vite handles the URL encoding automatically.

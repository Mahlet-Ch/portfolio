# Requirements Document

## Introduction

This feature converts Mahlet Chanyalew's existing static HTML/CSS portfolio website into a modern React application using Vite as the build tool. The conversion preserves all existing visual design, animations, content, and responsive behavior while reorganizing the codebase into reusable React components. The resulting application must be functionally equivalent to the original site, with improved code organization, maintainability, and a proper development workflow.

## Glossary

- **App**: The top-level React application component that composes all section components.
- **Navbar**: The fixed navigation bar component with logo, navigation links, and mobile hamburger toggle.
- **Home**: The full-viewport header section component displaying the name, title, bio, and profile image.
- **About**: The section component displaying the about-me content and secondary profile image.
- **Skills**: The section component displaying the three skill category cards (Technical Skills, Experience, Education).
- **Projects**: The section component displaying the three project cards with hover overlay effects.
- **Contact**: The section component containing contact information, social media links, and the contact form.
- **Footer**: The footer component displaying the copyright notice.
- **ContactForm**: The sub-component within Contact that handles form state and submission.
- **Vite**: The build tool and development server used to scaffold and run the React application.
- **CSS Module**: A CSS file scoped to a single component to avoid class name collisions.
- **Font Awesome**: The icon library loaded via CDN kit script for phone, email, and social media icons.
- **Smooth Scroll**: Browser-native smooth scrolling behavior triggered by anchor links to section IDs.

---

## Requirements

### Requirement 1: Project Scaffolding

**User Story:** As a developer, I want the project scaffolded with Vite and React, so that I have a proper build toolchain with hot module replacement and a production build step.

#### Acceptance Criteria

1. THE App SHALL be bootstrapped using `npm create vite@latest` with the React template.
2. THE App SHALL include all original image assets copied into the `src/assets/` directory.
3. THE App SHALL load the Font Awesome kit script via a `<script>` tag in `index.html`.
4. THE App SHALL import the Google Fonts (Playfair Display and PT Serif) via `<link>` tags in `index.html`.
5. THE App SHALL define global CSS reset, `body`, `html`, and `.container` styles in a single `src/index.css` file.
6. WHEN `npm run dev` is executed, THE Vite SHALL start a local development server.
7. WHEN `npm run build` is executed, THE Vite SHALL produce an optimized production bundle in the `dist/` directory.

---

### Requirement 2: Component Architecture

**User Story:** As a developer, I want the site broken into focused React components, so that each section is independently maintainable and reusable.

#### Acceptance Criteria

1. THE App SHALL render the following components in order: `Navbar`, `Home`, `About`, `Skills`, `Projects`, `Contact`, `Footer`.
2. THE App SHALL compose all section components within a single `App.jsx` file.
3. EACH section component SHALL reside in its own file under `src/components/`.
4. EACH component SHALL have a co-located CSS file (e.g., `Navbar.css`) imported directly into that component's `.jsx` file.
5. THE App SHALL contain no inline styles; all styling SHALL be applied via CSS class names matching the original CSS files.

---

### Requirement 3: Navbar Component

**User Story:** As a visitor, I want a fixed navigation bar that lets me jump to any section, so that I can navigate the page without scrolling manually.

#### Acceptance Criteria

1. THE Navbar SHALL render a fixed-position bar at the top of the viewport with a black background.
2. THE Navbar SHALL display the logo text "Mahlet" with the letter "M" styled in orangered.
3. THE Navbar SHALL render navigation links for: Home, About Me, Skills, Projects, and Contacts — each linking to the corresponding section ID via an anchor href.
4. THE Navbar SHALL display a three-bar hamburger toggle button on viewports 768px wide or narrower.
5. WHEN the hamburger toggle is clicked, THE Navbar SHALL show or hide the navigation menu by toggling an `active` CSS class on both the menu and the toggle button.
6. WHEN a navigation link is clicked on a mobile viewport, THE Navbar SHALL close the navigation menu.
7. THE Navbar SHALL manage the open/closed menu state using a React `useState` hook.

---

### Requirement 4: Home Section Component

**User Story:** As a visitor, I want to see a compelling home section when the page loads, so that I immediately understand who Mahlet is and what she does.

#### Acceptance Criteria

1. THE Home SHALL render inside the `<header>` element with the id `header` and occupy at least the full viewport height.
2. THE Home SHALL display the heading "Hi, I'm Mahlet" with "Mahlet" styled in orangered.
3. THE Home SHALL display the subheading "A Front-End Web Developer".
4. THE Home SHALL display the bio paragraph: "I'm Mahlet Chanyalew, a Front-End Website Developer based in Dessie, Ethiopia. I specialize in creating admirable and amazing websites with modern design principles."
5. THE Home SHALL display a "Contact me" button that scrolls to the `#contacts` section when clicked.
6. THE Home SHALL display the profile image (`pic 2.jpg`) with a circular border, an orangered glow box-shadow, and a continuous floating CSS animation.
7. WHEN the viewport width is 992px or narrower, THE Home SHALL stack the text content below the image and center-align all text.

---

### Requirement 5: About Section Component

**User Story:** As a visitor, I want to read a detailed about section, so that I can learn more about Mahlet's background and experience.

#### Acceptance Criteria

1. THE About SHALL render as a `<section>` element with the id `about` and a black background with white text.
2. THE About SHALL display the heading "About Me" with "About" styled in orangered.
3. THE About SHALL display the subheading "Front-End Developer" with "Developer" styled in orangered.
4. THE About SHALL display the full about-me paragraph describing Mahlet's background, Udacity certificate, and Andalus Coding Academy enrollment.
5. THE About SHALL display the secondary profile image (`new.jpg`) with a circular border and an orangered glow animation.
6. THE About SHALL display a "Read More" button that scrolls to the `#projects` section when clicked.
7. WHEN the viewport width is 992px or narrower, THE About SHALL stack the image above the text content and center-align all text.

---

### Requirement 6: Skills Section Component

**User Story:** As a visitor, I want to see Mahlet's skills organized into categories, so that I can quickly assess her technical capabilities and background.

#### Acceptance Criteria

1. THE Skills SHALL render as a `<section>` element with the id `skills` and a white background.
2. THE Skills SHALL display the section heading "My Skills" with "Skills" styled in orangered.
3. THE Skills SHALL render three skill cards: "Technical Skills", "Experience", and "Education".
4. THE Skills card for "Technical Skills" SHALL list the items: HTML, CSS, JavaScript, React, Responsive Design.
5. THE Skills card for "Experience" SHALL list the items: Creating websites for Hotels, Developing portfolio websites, Company website development.
6. THE Skills card for "Education" SHALL list the items: Software Engineering at Wollo University, Andalus Coding Academy, Udacity Online Courses.
7. WHEN a skill card is hovered, THE Skills SHALL reveal the skill items with a staggered fade-in and scale transition, with each successive item delayed by 0.1s.

---

### Requirement 7: Projects Section Component

**User Story:** As a visitor, I want to browse Mahlet's projects with visual previews, so that I can evaluate the quality and variety of her work.

#### Acceptance Criteria

1. THE Projects SHALL render as a `<section>` element with the id `projects` and a white background.
2. THE Projects SHALL display the section heading "My Projects" with "Projects" styled in orangered.
3. THE Projects SHALL render three project cards, each containing an image, a title, and a description.
4. THE Projects card 1 SHALL display image `phone.jpg`, title "Website Development For Hotels", and the corresponding description.
5. THE Projects card 2 SHALL display image `mobile.png`, title "Developing Websites for Companies", and the corresponding description.
6. THE Projects card 3 SHALL display image `photo 2 (2).jpg`, title "Developing Portfolio Websites", and the corresponding description.
7. WHEN a project card is hovered, THE Projects SHALL slide up an overlay panel with a gradient background revealing the title and description.
8. WHEN a project card is hovered, THE Projects SHALL scale the card image to 110% size.

---

### Requirement 8: Contact Section Component

**User Story:** As a visitor, I want to contact Mahlet directly or via social media, so that I can reach out for collaboration or inquiries.

#### Acceptance Criteria

1. THE Contact SHALL render as a `<section>` element with the id `contacts` and a white background.
2. THE Contact SHALL display the section heading "Contact Me" with "Contact" styled in orangered.
3. THE Contact SHALL display a phone link `+251972455363` with a Font Awesome phone icon.
4. THE Contact SHALL display an email link `mahletchanyalew80@gmail.com` with a Font Awesome envelope icon.
5. THE Contact SHALL display social media icon links for Telegram, Instagram, LinkedIn, and GitHub, each opening the correct URL.
6. THE Contact SHALL render a contact form with fields: Name (text), Email (email), and Message (textarea), all marked as required.
7. WHEN the contact form is submitted, THE ContactForm SHALL prevent the default browser navigation and display a success message to the user in place of the form.
8. THE ContactForm SHALL manage field values and submission state using React `useState` hooks.
9. WHEN the viewport width is 768px or narrower, THE Contact SHALL stack the contact info and form vertically.

---

### Requirement 9: Footer Component

**User Story:** As a visitor, I want to see a footer at the bottom of the page, so that I know the site's copyright information.

#### Acceptance Criteria

1. THE Footer SHALL render a `<footer>` element with a light gray background.
2. THE Footer SHALL display the text "© 2024 Mahlet Chanyalew - All Rights Reserved."

---

### Requirement 10: Visual Fidelity and Animations

**User Story:** As a visitor, I want the React app to look and behave identically to the original HTML site, so that the conversion is transparent to end users.

#### Acceptance Criteria

1. THE App SHALL preserve all CSS animations defined in the original CSS files, including the `float` keyframe animation on profile images and the `fadeIn` keyframe animation on the home heading.
2. THE App SHALL preserve all hover transition effects on navigation links, buttons, skill cards, project cards, and social media icons.
3. THE App SHALL preserve all responsive breakpoints at 480px, 768px, and 992px as defined in the original CSS files.
4. THE App SHALL use the same color palette as the original site: black (`#000`), white (`#fff`), orangered (`#ff4500` / `orangered`), and dark rose (`#872351`).
5. THE App SHALL use `scroll-behavior: smooth` on the `html` element so anchor navigation scrolls smoothly.

---

### Requirement 11: Accessibility

**User Story:** As a visitor using assistive technology, I want the React app to be accessible, so that I can navigate and consume the content regardless of ability.

#### Acceptance Criteria

1. THE Navbar hamburger toggle SHALL include an `aria-label` attribute describing its purpose.
2. WHEN the mobile navigation menu is open, THE Navbar SHALL set `aria-expanded="true"` on the toggle button; WHEN closed, THE Navbar SHALL set `aria-expanded="false"`.
3. THE Home profile image SHALL include a descriptive `alt` attribute.
4. THE About profile image SHALL include a descriptive `alt` attribute.
5. EACH project card image SHALL include a descriptive `alt` attribute.
6. EACH social media icon link SHALL include an `aria-label` attribute naming the platform.

# 🚀 Sakti Swarup Mishra — Portfolio Website

A modern, premium, and fully responsive **Full Stack Developer** portfolio built with **Vue.js 3**, **Vite**, and **Tailwind CSS v4**.

---

## ✨ Features

- ⚡ **Vue.js 3** (Composition API) + **Vite** for blazing-fast builds
- 🎨 **Tailwind CSS v4** with custom cyber-gradient theme
- 🌙 **Dark / Light Mode** toggle with localStorage persistence
- 🧊 **Glassmorphism UI** — frosted-glass cards, soft shadows, gradient backgrounds
- 🎬 **Scroll Animations** via VueUse Motion
- ⌨️ **Typewriter Effect** cycling through taglines
- 🔍 **Filterable Projects** by category (AI, Web, Backend, Game, Security)
- 📬 **Contact Form** with validation (EmailJS integration ready)
- 📱 **Responsive Mobile-First** design with hamburger navigation
- 🔎 **SEO Optimized** — meta tags, Open Graph, semantic HTML
- 🚀 **Deployment Ready** — Netlify / Vercel optimized

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Vue.js 3 (Composition API) |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Routing** | Vue Router 4 |
| **Animations** | @vueuse/motion |
| **Contact Form** | @emailjs/browser (ready to configure) |
| **Fonts** | Inter, JetBrains Mono (Google Fonts) |

---

## 📁 Project Structure

```
src/
├── main.js                     # App entry point
├── App.vue                     # Root component (NavBar + RouterView)
├── style.css                   # Design system & custom utilities
├── router/
│   └── index.js                # Vue Router with smooth-scroll
├── composables/
│   └── useTheme.js             # Dark/Light mode composable
├── data/
│   └── index.js                # All portfolio content (easy to edit)
├── views/
│   └── Home.vue                # Assembles all sections
└── components/
    ├── NavBar.vue               # Fixed navbar with glass-on-scroll
    ├── ThemeToggle.vue          # Dark/Light toggle button
    ├── TypeWriter.vue           # Typing animation component
    ├── SectionHeading.vue       # Reusable section title
    ├── HeroSection.vue          # Full-screen hero with CTAs
    ├── AboutSection.vue         # Stats & info cards
    ├── SkillsSection.vue        # Skill categories + progress bars
    ├── ExperienceSection.vue    # Professional timeline
    ├── ProjectsSection.vue      # Filterable project cards
    ├── CertificationsSection.vue# Achievements & certifications
    ├── ContactSection.vue       # Contact form + social links
    └── FooterSection.vue        # Footer with social icons
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/saktiswarupmishra/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 🌐 Deployment

### Netlify

1. Connect your GitHub repository
2. **Build command:** `npm run build`
3. **Publish directory:** `dist`

### Vercel

1. Import your GitHub repository
2. **Framework Preset:** Vite
3. Deploy — Vercel auto-detects settings

---

## ✏️ Customization

### Content

All portfolio content is in **`src/data/index.js`** — update your:

- Personal info (name, email, phone, links)
- About Me cards
- Skills & proficiency levels
- Work experience
- Projects (title, description, tech stack, links)
- Certifications & achievements

### EmailJS Integration

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Get your **Service ID**, **Template ID**, and **Public Key**
3. Uncomment the EmailJS code in `src/components/ContactSection.vue`
4. Replace the placeholder IDs with your credentials

### Theme Colors

Edit the `@theme` block in **`src/style.css`** to change the color palette.

---

## 📊 Performance

| Metric | Score |
|---|---|
| CSS Bundle | 36 kB (6.9 kB gzip) |
| JS Bundle | 167 kB (61.7 kB gzip) |
| Build Time | < 2 seconds |

---

## 📄 License & Copyright

**© 2025–2026 Sakti Swarup Mishra. All rights reserved.**

This project and its source code are the intellectual property of **Sakti Swarup Mishra**.

- You may **view** and **fork** this repository for personal learning purposes.
- You may **not** use this code, design, or content for commercial purposes without explicit written permission.
- You may **not** claim this work as your own or redistribute it under a different name.
- Any use of the personal information, branding, or content displayed in this portfolio is strictly prohibited without consent.

For permissions or inquiries, contact: **saktiswarupmishra@gmail.com**

---

## 🤝 Contact

- **Email:** saktiswarupmishra@gmail.com
- **LinkedIn:** [linkedin.com/in/saktiswarupmishra](https://linkedin.com/in/saktiswarupmishra)
- **GitHub:** [github.com/saktiswarupmishra](https://github.com/saktiswarupmishra)
- **Location:** Bhubaneswar, Odisha, India

---

<p align="center">
  Built with ❤️ by <strong>Sakti Swarup Mishra</strong>
</p>

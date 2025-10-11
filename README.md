# Boost08 - Intelligent Tillväxtplattform

En modern webbplats byggd med React, TypeScript, Tailwind CSS och Vite.

## 🚀 Funktioner

- **SEO-optimerad**: Schema markup, meta tags, sitemap
- **Prestanda**: Lazy loading, code splitting, optimerade bilder
- **Analytics**: Google Analytics 4 integration med event tracking
- **Responsiv Design**: Mobile-first approach
- **Tillgänglighet**: WCAG 2.1 AA compliant
- **Multi-page**: Solution pages, industry pages, case studies

## 📦 Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- React Helmet Async (SEO)
- Shadcn/ui Components
- Lucide React Icons

## 🛠️ Utveckling

```bash
# Installera dependencies
npm install

# Starta development server
npm run dev

# Bygg för production
npm run build

# Preview production build
npm run preview
```

## 📊 Analytics Setup

1. Ersätt `GA_MEASUREMENT_ID` i `src/utils/analytics.ts` med ditt Google Analytics ID
2. Lägg till Google Analytics script i `index.html`

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 SEO Checklist

- ✅ Unique meta titles and descriptions for all pages
- ✅ Schema.org structured data (Organization, LocalBusiness, FAQPage)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Alt text for all images
- ✅ Semantic HTML

## 📈 Performance Optimization

- Image lazy loading
- Code splitting per route
- Optimized bundle size
- CSS and JS minification
- Gzip compression

## 🔗 Viktiga URL:er

- **Hem**: `/`
- **Lösningar**: `/losningar`
- **Bransch**: `/bransch/{industry}`
- **Resultat**: `/resultat`
- **Om Oss**: `/om-oss`
- **Prova Gratis**: `/prova-gratis`
- **Kontakt**: `/kontakt`

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/419f76b6-c3fe-4da8-89c5-7d1a8de877ae

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/419f76b6-c3fe-4da8-89c5-7d1a8de877ae) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/419f76b6-c3fe-4da8-89c5-7d1a8de877ae) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

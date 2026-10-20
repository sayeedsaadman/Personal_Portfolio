# Sadman Saad — Personal Portfolio

A React + TypeScript portfolio with Vite, Three.js, React Three Fiber, Drei, GSAP, and Lucide. Outfit and Manrope are self-hosted. The page includes projects, research, about, professional experience, skills, recognition, an animated education journey, and contact.

## Local development

Use Node.js 22.12+.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

The production output is `dist/`. For a manual Netlify upload, use `npm run build:netlify` to compile the online form flag into the output.

## Content

Edit `src/data/portfolio.ts` for profile, projects, research, education, experience, skills, and contact links.

- Both Techvue360 roles, their dates, and current responsibilities were confirmed by the owner.
- AgroManagement features follow the supplied README.
- Path-HGT includes the seven supplied authors, accepted status, and DOI.
- Email, GitHub, and LinkedIn match the owner-supplied destinations.
- Missing CV, project demos, research PDF/abstract/contribution, and other unspecified details remain unset. Do not invent them.
- Research artwork is a conceptual pathology illustration, not a figure from the paper.

Section components control layout and wording. Styling is in `src/styles/global.css` and `src/styles/refinements.css`. Metadata is in `index.html`; set the canonical URL and absolute social-card URL once a domain is chosen.

## Contact delivery

The frontend is prepared for Netlify Forms. Static form markup in `index.html` lets Netlify detect the React form, and submissions use URL-encoded POST requests. The form includes validation, a honeypot, a timeout, and visible failure handling.

**Email notification routing must still be configured in the Netlify dashboard for `sayeedssaadman272491@gmail.com`. Delivery has not been tested on a hosted site.** Follow [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md).

On localhost, the form prepares a `mailto:` draft. It explicitly says the message has not been sent and requires the visitor to open their email app and send it. The direct email link is also available.

`VITE_NETLIFY_FORMS=true` selects hosted submission behavior. Netlify Git builds receive this public flag from `netlify.toml`; `npm run build:netlify` uses `.env.netlify`. No Gmail password or API secret is needed in frontend code.

## Animation and accessibility

One lazy-loaded WebGL canvas displays a motherboard and AI graph. The education rocket follows scroll progress. Canvas pixel ratio is capped, and mobile particle counts are reduced.

- The operating system's reduced-motion preference is respected.
- The persistent motion button pauses animation.
- `?motion=reduce` selects reduced motion.
- `?render=static` uses the CSS fallback without a canvas.
- Text, navigation, and contact remain ordinary HTML, independent of WebGL.

The Three.js dependency produces a large lazy chunk; no Lighthouse or Core Web Vitals score is claimed.

## Deployment and verification

[NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) contains the upload, Git deployment, email notification, and live verification steps. [QA.md](QA.md) records completed checks and outstanding verification.

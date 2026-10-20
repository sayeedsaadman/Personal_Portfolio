# Verification record

Revision date: 2026-10-20 (Asia/Dhaka).

## Current revision

- Contact unit tests cover static/React field-name agreement, URL encoding, POST format, successful HTTP responses, HTTP/network failures, and the escaped email draft recipient.
- `npm test`: 4/4 contact tests passed.
- `npm run build:netlify`: TypeScript and Vite production build passed. The lazy Three.js engine still emits the expected chunk-size warning (704 kB uncompressed / 181 kB gzip).
- The refreshed local preview returned HTTP 200 for the page and all five initial JavaScript/CSS assets. The built HTML contains the `contact` form, Netlify detection attribute, and form-name input.
- Packaged the successful Netlify build as `portfolio-netlify.zip`; the archive contains the contents of `dist/`.
- Removed the three system demonstration sections and their animation targets.
- Updated the user-supplied project, publication, employment, skills, and contact information.
- Replaced external font requests with bundled Outfit and Manrope fonts.
- Added a static Netlify form declaration and matching React POST behavior.

## Browser verification limitation

The browser automation runtime failed to initialize with:

`failed to write kernel assets: The system cannot find the path specified. (os error 3)`

A reset and a separate desktop runtime initialization failed with the same error. Therefore the current typography, updated layouts, education rocket, and form interactions have **not been visually verified in this revision**. Earlier screenshots in `docs/` predate these changes and must not be treated as current evidence.

Prior-version checks covered navigation, mobile menu keyboard behavior, responsive widths, project expansion, skills tabs, motion controls, and static canvas fallback. Those results are historical and do not certify the revised layout.

## Hosted verification still required

- Deploy to Netlify, enable form detection, redeploy, and add the Gmail email notification.
- Send a real test and confirm both the Netlify submission and Gmail receipt.
- Check desktop and narrow mobile layouts, including long project names, publication metadata, and the email address.
- Check the rocket with normal motion and reduced motion.
- No hosted site, actual mailbox delivery, Lighthouse score, physical-device testing, or cross-browser result is claimed.

# Akari Studio Website — Repository Guide

Last reviewed: 1 August 2026

## Read first

This repository contains the Akari Studio company website.

The detailed vault documentation is in:

`AkariStudios/Studio Website/`

Primary sources:

1. `10 Project Guide.md`
2. `09 Build Workstream.md`
3. `01 Website Creative Brief.md`
4. `02 Experience and Wow Strategy.md`
5. `03 Site Architecture and Page Narratives.md`
6. `04 Work and Proof Strategy.md`
7. `05 Content Requirements and Decisions.md`
8. `08 Visual Identity and Logo Brief.md`
9. `11 UX and Usability Audit.md`

## Current handover

The complete rolling-preview site is implemented and has passed the first structured UX/usability review.

Implemented routes:

- `/` — complete homepage, cross-industry method, ways to work, fit guidance, and enquiry preparation
- `/case-study.html` — transparent Ashworth & Vale concept case study
- `/privacy.html` — accurate preview-stage privacy explanation
- `/404.html` — branded recovery page

The remaining production dependency is the enquiry delivery endpoint. The form currently validates input and prepares a structured project summary locally; it deliberately does not imply that a message was sent. Before a final custom-domain launch, connect the chosen inbox/form service, add appropriate spam protection, test a real submission, and update the privacy copy.

Rolling preview: `https://renzo-mcg.github.io/AkariStudio/`

Detailed audit: `AkariStudios/Studio Website/11 UX and Usability Audit.md`

Custom domain: `https://akaristudio.co.uk/`

Ashworth & Vale live concept: `https://ashworth-vale.akaristudio.co.uk/`

Recipient preview platform: `https://previews.akaristudio.co.uk/`

Domain connection was configured on 26 July 2026. The Krystal DNS zone uses
`ns1–ns4.kloudns.co.uk`, the apex has GitHub Pages’ four A records, and `www`
is a CNAME to `renzo-mcg.github.io`. GitHub Pages now enforces HTTPS, and the
live custom domain has a valid certificate.

The recipient platform is independent of this repository. It deploys the
private `Renzo-McG/akari-previews` repository from `main` through the
Cloudflare Pages project `akari-previews`. Its Krystal record is
`CNAME previews → akari-previews.pages.dev`; custom-domain HTTPS is active,
non-production branch deployments are disabled and GitHub App access is
restricted to that repository. The canonical operational record is
`AkariStudios/Prospects/00 Outbound Workflow.md`.

## Locked decisions

- Public name: **Akari Studio**
- Japanese secondary mark: **明かり**
- Meaning: light / illumination
- Brand line: **Your quality, brought to light.**
- Akari serves small businesses across industries.
- The studio will not use a visible founder profile.
- Initial release: homepage plus Ashworth & Vale case study.
- Ashworth & Vale is an independent fictional concept and must be labelled accordingly.
- Two conversion paths: “Show us your current site” and “Start a project.”

## Experience rules

- Clear in five seconds and richer over five minutes.
- Essential meaning cannot depend on animation or JavaScript.
- Motion must reveal, compose, transform, connect, or show progress.
- Mobile and reduced-motion behaviours are designed with the main experience.
- Use one coherent signature system and one focal experience per page.
- Every memorable choice must improve attention, comprehension, proof, trust, or action.

## Identity rules

- `AKARI STUDIO` is the immediately readable primary name.
- `明かり` is meaningful secondary typography, not visual texture.
- Explain its meaning once in a deliberate brand moment.
- Avoid Japanese visual clichés and literal light symbols.
- The identity must work statically, in one colour, and at favicon size.
- Approved hybrid: bilingual `AKARI STUDIO / 明かり` lockup, compact aperture mark, restrained light-line reveal.

## Approved visual direction

- Direction name: **Warm Luminous Precision**
- Inter only; no serif pairing
- White, cool grey, near-black, disciplined navy
- Restrained warm-stone/beige surfaces
- Familiar, professional structure derived from Ashworth & Vale
- Akari’s distinction comes through controlled illumination, reveal, pacing, and proof
- Avoid fragmented technical grids, monospace, acid colour, dark creative-coding aesthetics, and awards-site theatre

## Proof and outbound-preview rules

- Do not invent clients, results, testimonials, awards, accreditations, or metrics.
- Label concept work clearly.
- Show reasoning alongside outcomes.
- Never use or recreate a prospect’s logo, or reuse its project/customer photography, in an unsolicited concept.
- Do not promote an unsolicited concept publicly, add it to Akari’s portfolio, link it from the Akari site or submit it for indexing.
- Controlled recipient-specific delivery is permitted only through the private outbound operating system after Lawrence approves it: random opaque URL, `noindex, nofollow, noarchive` on every page, no public navigation/sitemap entry, required disclaimer, recorded 30–45 day expiry and immediate removal capability.
- An unlisted URL is not genuinely private. Do not describe it as access-controlled.
- Do not block the preview in `robots.txt` while relying on HTML `noindex`.
- Never change the Ashworth repository merely to create Akari evidence.

The canonical process, asset policy, preview controls and approval gates are in:

- `AkariStudios/Prospects/00 Outbound Workflow.md`
- `AkariStudios/Prospects/01 Prospect Pipeline.md`
- `AkariStudios/Prospects/02 Prospect Template.md`

Outbound reports and concepts remain separate from this company website repository. Polished recipient-facing HTML belongs only in the separate private `AkariStudios/akari-previews/` repository after approval.

## Technical direction

- Semantic multi-page HTML
- Shared CSS
- Progressive vanilla JavaScript
- Mobile-first responsive implementation
- No required build step
- Core content readable without JavaScript
- Respect `prefers-reduced-motion`
- Optimised local image/video assets

## Implemented interaction contract

- Header becomes visually grounded after scroll.
- Mobile navigation uses a labelled button, `aria-expanded`, Escape-to-close, focus return, and body-scroll lock.
- Industry and case-evidence switchers use real tab semantics and support Arrow keys, Home, and End.
- The before/after comparison supports pointer, touch, Arrow keys, Home, and End.
- Form validation identifies each missing field, moves focus to the first error, and exposes the prepared summary as a focused result.
- All essential copy remains available when JavaScript is unavailable.
- Reduced-motion users receive the composed state without decorative transition delay.

## Change protocol

When a decision changes:

1. update the vault’s `10 Project Guide.md`;
2. update `09 Build Workstream.md`;
3. update this file;
4. make the implementation change;
5. verify and record the milestone.

Do not leave an approved decision only in chat.

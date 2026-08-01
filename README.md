# Akari Studio

The company website for Akari Studio.

Akari creates distinctive, conversion-led websites for ambitious small businesses whose online presence does not reflect the quality of their work.

> Your quality, brought to light.

## Status

The public site remains on the approved production baseline while the final
pre-outreach candidate is reviewed locally on `feature/final-studio-pass`.

The approved initial release contains:

- A focused studio homepage
- An Ashworth & Vale case study
- Two enquiry routes: “Show us your current site” and “Start a project”
- Privacy content and a custom 404 experience

The local candidate adds the approved Luminous Continuity interaction system,
a hybrid desktop/mobile Process presentation, two non-priced website routes,
stronger responsive evidence and a truthful email-preparation journey. It has
not been pushed, merged or deployed.

Read `PROJECT-GUIDE.md` before changing strategy, content, design, or implementation.

## Technical approach

The initial implementation uses semantic HTML, modern CSS, and progressive vanilla JavaScript.

Reasons:

- no framework or runtime dependency is needed for the approved two-page scope;
- the output remains fast, portable, and easy to hand off;
- interactions can be progressively enhanced while preserving complete static content;
- it aligns with Akari’s potential site-file handoff offer;
- it avoids introducing a build system before the signature prototypes prove one is necessary.

This decision should be revisited only if an approved experience genuinely requires capabilities the lean approach cannot provide cleanly.

## Local preview

Serve this directory with a local static server and open `index.html`.

## Source material

The Ashworth & Vale project is a separate repository. Do not edit or move it as part of Akari company-site work.

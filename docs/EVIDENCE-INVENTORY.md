# Evidence Inventory

## Ashworth & Vale source

- Local repository: `AkariStudios/akari-studio-site/`
- GitHub repository: `https://github.com/Renzo-McG/Ashworth-and-Vale`
- Rolling preview: `https://renzo-mcg.github.io/Ashworth-and-Vale/`
- Current local repository contains uncommitted work. Treat it as read-only for Akari evidence collection.

## Evidence candidates

### Homepage

- Outcome-led hero
- Big-stat trust treatment
- Service presentation
- Asymmetric project bento grid
- Condensed process
- Responsive navigation and mobile menu

### Services

- Persistent service navigation
- Scroll-linked active service state
- Alternating service narratives
- Practical FAQ resolution

### Projects

- Category filters
- Visible active state
- Matching-project count
- Responsive portfolio grid

### Project detail

- Before/after comparison
- Keyboard-operable slider
- Project narrative
- Finished-work carousel
- Mobile touch behaviour

### Process

- Numbered timeline
- Developing architectural drawing
- Scroll-linked state
- Contrasting Build stage
- Reduced-motion/static reading path

### FAQ

- Topic navigation
- Accessible accordions
- Complete no-JavaScript fallback

### Contact

- To be assessed when the Ashworth page is approved and complete

## Capture matrix

Capture only approved, stable states.

| Evidence | Desktop still | Mobile still | Short recording | Keyboard | Reduced motion | Status |
|---|---:|---:|---:|---:|---:|---|
| Homepage opening | Required | Required | Optional | N/A | Required | Pending |
| Project bento grid | Required | Required | Optional | Required | N/A | Pending |
| Service scroll state | Required | Required | Required | Required | Required | Pending |
| Project filters | Required | Required | Required | Required | N/A | Pending |
| Before/after slider | Required | Required | Required | Required | Required | Pending |
| Process drawing | Required | Required | Required | N/A | Required | Pending |
| FAQ workspace | Required | Required | Optional | Required | N/A | Pending |

## Evidence used in the Akari case study — 25 July 2026

The production case study deliberately uses a focused subset rather than pretending to document every Ashworth route:

| Production asset | Case-study role | Loading | Status |
|---|---|---|---|
| `assets/images/ashworth-home.jpg` | Opening/proof overview | Eager only where visually critical | Included |
| `assets/images/ashworth-before.jpg` | Before/after comparison baseline | Lazy | Included |
| `assets/images/ashworth-after.jpg` | Before/after comparison reveal | Lazy | Included |
| `assets/images/ashworth-projects.jpg` | Decision-journey/system evidence | Lazy | Included |
| `assets/images/ashworth-services.jpg` | Service-structure evidence | Lazy | Included |

Implemented evidence interactions:

- Experience / Reasoning / System tabs with correct ARIA relationships and Arrow/Home/End keyboard movement
- Before/after control with pointer, touch, Arrow, Home, and End input
- Static text and imagery retain the full argument without animation
- Independent fictional concept label appears before visitors could infer a client relationship

## Evidence principles

- Prefer a few decisive examples over a complete site tour.
- Pair each capture with the customer question and design decision it proves.
- Use still images as the accessible baseline.
- Keep recordings short, muted by default, captioned, and supported by poster frames.
- Do not present local unapproved work as finished public proof.

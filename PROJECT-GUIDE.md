# Akari Studio Website — Repository Guide

Last reviewed: 24 July 2026

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

## Current handover

Stage 0 is in progress.

Project skeleton, technical approach, repository guide, and evidence registers have been created. The project is connected to `https://github.com/Renzo-McG/AkariStudio` and the foundation is on `main`. Ashworth & Vale evidence capture and licensing review remain before Stage 0 approval.

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

## Proof rules

- Do not invent clients, results, testimonials, awards, accreditations, or metrics.
- Label concept work clearly.
- Show reasoning alongside outcomes.
- Do not publish unsolicited prospect concepts without permission.
- Never change the Ashworth repository merely to create Akari evidence.

## Technical direction

- Semantic multi-page HTML
- Shared CSS
- Progressive vanilla JavaScript
- Mobile-first responsive implementation
- No required build step
- Core content readable without JavaScript
- Respect `prefers-reduced-motion`
- Optimised local image/video assets

## Change protocol

When a decision changes:

1. update the vault’s `10 Project Guide.md`;
2. update `09 Build Workstream.md`;
3. update this file;
4. make the implementation change;
5. verify and record the milestone.

Do not leave an approved decision only in chat.

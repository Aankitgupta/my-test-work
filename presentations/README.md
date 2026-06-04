# Dental Performance Intelligence — Prospect Pitch Deck

A 3-slide storytelling pitch deck used to sell the Dental Performance Intelligence
solution to prospective multi-location dental groups.

| Slide | Story beat | Content |
|-------|-----------|---------|
| 1 | **The Challenge** | Fragmented operations, reactive decisions, 6 key pain points |
| 2 | **The Transformation** | One connected ecosystem with 6 integrated intelligence portfolios |
| 3 | **What You Gain + Partnership** | Stat callouts, 4 outcome pillars, and a "Partner with us" CTA |

Output: `dental-intelligence-pitch.pptx` (16:9 widescreen).

## Regenerate

```bash
npm install
npm run build
```

The generator (`build_pitch.js`) uses [PptxGenJS](https://gitbrent.github.io/PptxGenJS/)
and renders [react-icons](https://react-icons.github.io/react-icons/) (Feather set) to
PNG via `sharp` for crisp in-circle icons. This follows the create-from-scratch workflow
documented in the `pptx` agent skill (`.cursor/skills/pptx`).

## QA (optional)

```bash
# content check
python -m markitdown dental-intelligence-pitch.pptx

# visual check (requires LibreOffice + poppler)
soffice --headless --convert-to pdf dental-intelligence-pitch.pptx
pdftoppm -jpeg -r 150 dental-intelligence-pitch.pdf slide
```

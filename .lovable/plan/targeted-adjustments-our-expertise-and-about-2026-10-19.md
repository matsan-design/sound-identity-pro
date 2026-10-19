# Targeted adjustments — Our Expertise and About

Only the shared stylesheet and the Our Expertise page are touched. No other pages, texts, images or colours change.

## 1. Our Expertise
- Make the three existing boxes exactly 30% larger on desktop by scaling their current width and height values. Their design, colours, content and rounded corners stay the same. Mobile carousel sizing stays the same.
- Centre the title and subtitle horizontally above the boxes.

## 2. About
- Make the blue panel more compact and centred on desktop: limit its maximum width, centre it on the page, and tighten the gap between the text column and the photo.
- Restore the blue panel's rounded corners to match the reference.
- Make the portrait larger and move it toward the centre of the panel instead of keeping it pinned to the right edge, following the reference proportions.
- "Matej Sancin / Founder": remove the floating animation and the white glass background, so the text sits directly on the blue background. Its position is only adjusted if needed to stay beside the larger photo.
- The mobile layout stays as it is.

## Technical details
- `src/styles.css`: `.about-founder` (max-width, margin-inline auto, border-radius, column ratio), `.about-founder-portrait img` (larger max-height, centred), `.about-founder-label` (remove `animation`, `background` and `backdrop-filter`), `.svc-card` desktop dimensions multiplied by 1.3.
- `src/routes/our-expertise.tsx`: add `mx-auto text-center` to the title section.
- Check: one Playwright screenshot of each page at desktop and mobile size.

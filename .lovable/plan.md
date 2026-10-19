# About page — match "About page.png" on desktop

Only the About page and its styles are changed. Mobile, other pages, navigation, texts, colours and buttons stay as they are.

## Changes (desktop only)
1. **Figure**: replace the current photo with "NEW BLUE.png" (transparent background, unaltered).
2. **Blue panel**: make it nearly as wide as the page content (as in the reference), with large rounded corners. The panel height is about 0.48 times its width.
3. **Figure placement**: make it large, sitting in the right half of the panel, cut off at the bottom of the panel, with the head rising **above the top edge** of the panel as in the reference.
4. **Text column**: make the text larger to match the reference proportions. The title is about 4.2rem and fits on two lines, the intro text about 1.6rem, the buttons taller, and the statistics larger (about 3.4rem numbers and 1.3rem labels). The column sits vertically centred with tighter spacing, so the intro text runs next to the figure.
5. **"Matej Sancin / Founder"**: stays static with no white box, placed on the panel to the right of the figure at the same height as in the reference.

## Technical details
- Upload NEW_BLUE.png as a CDN asset and swap the import in `src/routes/about-us.tsx`. No other markup changes.
- `src/styles.css`, desktop rules only (min-width 768px) for `.about-founder`, `.about-founder-copy`, the title, intro text, buttons and statistics, `.about-founder-portrait img` (overflow visible, negative top so the head goes beyond the panel) and `.about-founder-label` (positioning only). The rules for screens up to 767px stay untouched.
- Check: one desktop screenshot compared with the reference, plus one mobile screenshot to confirm the phone layout has not changed.

# About page — match "About page.png" on desktop

Only the About page and its styles are changed. Mobile, other pages, navigation, texts, colours and buttons stay exactly as they are.

## Binding constraints
- "About page.png" is the absolute source of truth for the desktop page: proportions, layout, spacing, positioning and overall appearance. Any size values listed below are only estimates and never take priority over the reference.
- "NEW BLUE.png" is used exactly as supplied. It is not regenerated, retouched, cropped or recoloured. Only its display size and position change, using CSS.
- Changes are limited to the existing About page and the minimum desktop styling needed. Mobile and all other pages are preserved exactly.
- One final visual check against the reference, with no further rounds of changes and no unrequested adjustments.

## Changes (desktop only)
1. **Figure**: replace the current photo with "NEW BLUE.png".
2. **Blue panel**: shape, size, position and rounded corners match the reference. It is nearly as wide as the page content.
3. **Figure placement**: large, in the right half of the panel, cut off at the bottom of the panel, with the head rising above the top edge of the panel as in the reference.
4. **Text column**: scaled up and spaced to match the reference. The title fits on two lines, the intro text, buttons and statistics are larger, and spacing is tighter.
5. **"Matej Sancin / Founder"**: static, with no white box, placed to the right of the figure as in the reference.

## Technical details
- Upload NEW_BLUE.png as a CDN asset unchanged and swap the import in `src/routes/about-us.tsx`. No other markup changes.
- `src/styles.css`: desktop-only rules (min-width 768px) for the existing `.about-founder*` and `.about-stats` classes. The rules for screens up to 767px stay untouched.
- One desktop screenshot compared with the reference, plus one mobile screenshot to confirm the phone layout has not changed.

# MovieRecom visual system

## Direction

MovieRecom is a colorful editorial "cinema desk": expressive enough to feel like
film culture, calm enough to use late at night, and focused on getting someone to
one good recommendation.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#171321` | Primary background and high-contrast type |
| `--ink-soft` | `#251c31` | Panels and secondary dark surfaces |
| `--paper` | `#f6f1f8` | Main page surface |
| `--lavender` | `#e8dff0` | Quiet section surfaces |
| `--violet` | `#7c3aed` | Primary actions and selected states |
| `--coral` | `#ff6b5b` | Small expressive accents |
| `--cobalt` | `#4f6df5` | Secondary accent and editorial details |
| `--muted` | `#a99dae` | Supporting copy |

## Type and shape

- Use Geist Sans for all UI and display copy.
- Display headings use tight tracking and a large, compact line height.
- Supporting copy stays at 16px or larger where it carries meaning.
- Use 16px to 28px radii; avoid pill-shaped containers except for controls.
- Use high-contrast ink surfaces beside lavender surfaces to prevent an all-white
  page and reduce glare.

## Motion thesis

- Entrance: 0.6s ease-out opacity and 20px vertical reveal.
- Stagger: 0.08s between related items.
- Hover: 0.25s ease-out, maximum 4px lift or a small color shift.
- Scroll reveals are once-only and never block content.
- No autoplay video, noisy parallax, or infinite decorative loops.
- Under `prefers-reduced-motion`, content is immediately visible and transforms
  are removed.

## Homepage structure

1. Compact wordmark navbar with film-strip detail.
2. Editorial hero with a clear recommendation CTA.
3. "Tonight's signal" mood selector that passes its choice to `/recommend`.
4. Quote-led cinema section with alternating ink and paper cards.
5. Dark closing CTA for a strong visual finish.

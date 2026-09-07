# Image Brief — Appliance Repair Website

**Goal:** replace 8 mismatched photos (leftovers from a "Haushaltshilfe / Seniorenbetreuung"
project) with images that match the actual content: **appliance repair at the customer's home
in Berlin**. Layout, CSS and copy stay exactly as they are — only the picture files change.

**Your job:** generate the 8 images below and drop them into `public/images/_incoming/`.
**My job afterwards:** resize/convert/optimize with `sharp`, rename, wire into the components,
fix the alt texts, run the build.

---

## 1. House style — applies to ALL 8 images

Keep these constant so the set reads as one shoot. Paste this block into every prompt.

> Photorealistic commercial photography, bright and clean, soft even daylight, shallow depth of
> field, modern German apartment interior, professional male or female appliance repair
> technician in their 30s–40s wearing a **dark red / anthracite work polo or work jacket**,
> friendly competent expression, real tools, natural skin tones, sharp focus, high detail,
> 85mm lens look.

### Brand colours (the site is RED, not blue)

| Token | Hex | Where |
|---|---|---|
| `--blue` (misleading name, it's deep red) | `#b42318` | hero background, card stages |
| `--accent` | `#e33629` | buttons, highlights |
| `--primary` | `#0e1109` | near-black text |
| `--lightest-blue` | `#fff1f0` | pale rose tints |

The old images had **blue** aprons, which clashes with this palette. The technician's uniform
should be deep red, burgundy or anthracite grey. A small plain logo-free chest patch is fine.

### Hard rules — non-negotiable

1. **No text anywhere in the image.** Two of the current files have German marketing text
   burned into the pixels (`Haushaltshilfe nach §45a`, `EINKAUFSSERVICE`). No signage, no
   labels, no watermarks, no brand names on the appliances.
2. **No visible appliance brand logos** (Bosch/Siemens/Miele etc.). Generic unbranded machines.
3. **No elderly-care / cleaning / grocery framing.** This is a technical repair service, not
   home help. No cleaning buckets, no shopping bags, no caregiver-hugging-senior poses.
4. Keep the same **person** across all 8 images if your tool supports character consistency —
   one recognisable technician makes the set feel like a real company.

---

## 2. Two format families

The CSS treats the images in two different ways. Getting this wrong is the one thing that
would break the layout.

### Family A — "Cutout" (5 images)

Transparent background, subject **standing on the bottom edge** of a square canvas.
CSS: `object-fit: contain; object-position: center bottom;` on a coloured gradient stage.

- **Canvas:** 2000 × 2000 px, **1:1 square**
- **Background:** fully transparent (alpha) — or pure white `#FFFFFF` that I will key out
- **Composition:** subject bottom-anchored, feet/base flush with the bottom edge, ~10–15%
  empty headroom at the top, generous empty margin left and right
- **Deliver as:** PNG with alpha (I convert to WebP)

### Family B — "Full-bleed photo" (3 images)

Ordinary photo that fills the whole card. CSS: `object-fit: cover`.

- **Canvas:** 1536 × 1024 px, **3:2 landscape**
- **Background:** real interior, bright, with a light/white-ish wall
- **Deliver as:** PNG or JPG, no alpha needed

---

## 3. The 8 images

### Family B — full-bleed 3:2 (1536 × 1024)

---

#### `01-waschmaschine.png` — Washing machine (FEATURED card, biggest on the page)

**Format:** 3:2 landscape, 1536 × 1024, no transparency.
**Critical:** CSS crops this with `object-position: left center` — **put the subject in the
LEFT half of the frame** and keep the right half calm/empty, or the technician gets cropped out.

> Photorealistic commercial photography, a professional appliance repair technician in a dark
> red work polo kneeling on the LEFT side of the frame in front of an open front-loading
> washing machine in a bright modern German bathroom, holding a multimeter and inspecting the
> door seal, toolbox open on the floor beside him, the right half of the frame is a calm empty
> white tiled wall, soft even daylight, shallow depth of field, sharp focus, 85mm lens look,
> no text, no logos, no brand names.

---

#### `02-herd-backofen.png` — Oven / cooktop

**Format:** 3:2 landscape, 1536 × 1024, no transparency. Cropped **centred**.

> Photorealistic commercial photography, a professional appliance repair technician in a dark
> red work polo repairing a built-in electric oven in a bright modern German kitchen, oven door
> open, technician testing the heating element with a tool, clean white and light wood kitchen
> cabinets in the background, centred composition, soft even daylight, shallow depth of field,
> sharp focus, 85mm lens look, no text, no logos, no brand names.

---

#### `03-trockner.png` — Tumble dryer

**Format:** 3:2 landscape, 1536 × 1024, no transparency.

> Photorealistic commercial photography, a professional appliance repair technician in a dark
> red work polo servicing a tumble dryer in a bright modern German utility room, pulling out
> the lint filter and inspecting it, laundry basket nearby, clean bright interior, soft even
> daylight, shallow depth of field, sharp focus, 85mm lens look, no text, no logos, no brand
> names.

> **Note:** this one currently sits on a red gradient card stage as a cutout. If you'd rather
> keep it as a cutout, generate it in **Family A** format instead (2000×2000 transparent) and
> tell me — I'll adjust one CSS-free line in the component. Full-bleed 3:2 is the simpler path.

---

### Family A — square cutouts, transparent, bottom-anchored (2000 × 2000)

Append to every one of these:
`isolated on a fully transparent background, cut out, no background, subject standing on the
bottom edge of a square frame, empty space above and to the sides, product photography cutout
style, no shadow on the ground, no text, no logos, no brand names.`

---

#### `04-kuehlschrank.png` — Refrigerator

Sits on a **deep red gradient** card stage → make sure the subject reads clearly against red.

> Photorealistic cutout of a professional appliance repair technician in a dark red work polo
> standing beside a modern stainless-steel refrigerator with its door open, holding a
> thermometer and checking the interior, confident friendly expression, full body visible,
> isolated on a fully transparent background, cut out, no background, subject standing on the
> bottom edge of a square frame, empty space above and to the sides, product photography cutout
> style, no shadow on the ground, no text, no logos, no brand names.

---

#### `05-spuelmaschine.png` — Dishwasher

Sits on a **white** card stage → avoid a white-on-white silhouette, keep the uniform saturated.

> Photorealistic cutout of a professional appliance repair technician in a dark red work polo
> kneeling beside an open dishwasher, pulling out the lower basket and inspecting the spray arm,
> toolbox beside him, isolated on a fully transparent background, cut out, no background,
> subject on the bottom edge of a square frame, empty space above and to the sides, product
> photography cutout style, no shadow on the ground, no text, no logos, no brand names.

---

#### `06-kaffeemaschine.png` — Coffee machine

Sits on a **deep red gradient** stage. **Also reused in the bottom booking banner (left side)**
at ~326 px wide — so it must still read at small size. Keep the silhouette simple.

> Photorealistic cutout of a professional appliance repair technician in a dark red work polo
> holding and servicing a modern stainless-steel automatic espresso machine, brew group unit in
> one hand, focused expression, isolated on a fully transparent background, cut out, no
> background, subject standing on the bottom edge of a square frame, empty space above and to
> the sides, product photography cutout style, no shadow on the ground, no text, no logos, no
> brand names.

---

#### `07-tv-elektronik.png` — TV / electronics

Sits on a **white** card stage.

> Photorealistic cutout of a professional appliance repair technician in a dark red work polo
> working on the back of a large flat-screen television, rear panel removed, holding a
> screwdriver and a circuit board, concentrated expression, isolated on a fully transparent
> background, cut out, no background, subject standing on the bottom edge of a square frame,
> empty space above and to the sides, product photography cutout style, no shadow on the ground,
> no text, no logos, no brand names.

---

#### `08-hero.png` — HERO image (most important — top of the page)

Sits bottom-right over the **deep red `#b42318` hero background**, up to 680 px wide, with a
thin white circle outline behind it and a drop shadow. Needs strong contrast against red and a
clean, confident silhouette. Faces should be clearly visible and friendly — this is the trust
shot.

> Photorealistic cutout of a confident professional appliance repair technician in a dark
> anthracite grey work jacket with dark red trim, standing with a toolbox in one hand and a
> friendly welcoming smile, looking at the camera, full body, slight three-quarter stance,
> clean strong silhouette, isolated on a fully transparent background, cut out, no background,
> subject standing on the bottom edge of a square frame, generous empty space above and to the
> sides, product photography cutout style, no shadow on the ground, no text, no logos, no brand
> names.

> **Contrast check:** the background behind this is deep red `#b42318`. Avoid a red-on-red
> uniform for the hero specifically — anthracite grey with red accents reads best.

---

## 4. Also reused in the booking banner

The banner at the bottom of the page currently shows two cutouts. To keep it simple I'll reuse
existing files rather than ask you for extra images:

- banner **left** → `06-kaffeemaschine.png`
- banner **right** → `04-kuehlschrank.png`

If you'd prefer two dedicated banner images, generate them in Family A format and name them
`09-banner-left.png` / `09-banner-right.png` — I'll wire them up instead.

---

## 5. What NOT to touch

| Asset | Reason |
|---|---|
| `public/images/services/1.webp` … `6.webp` | Still used by the physics section right after the hero — the one you excluded. These files stay on disk exactly as they are. |
| `public/images/qlinest/vector-4.svg`, `vector-5.svg` | Decorative background patterns, brand-neutral, fine as-is. |
| `public/images/logo.png`, `logo-white.png` | Logos. |

Because the physics section shares files `1–6.webp` with the service cards, the new images go
into a **new folder** (`public/images/repair/`) under new names. Nothing is overwritten, so the
excluded section is guaranteed untouched.

**Dead code found:** `public/images/ui/senior-assistance.svg` and the whole `ServiceArtwork`
component are never rendered — every service has an `image`, so the fallback branch is
unreachable. No replacement image needed. I can delete the dead branch separately if you want.

**Unused file:** `public/images/hero/alltagshilfe-hero.png` (1.7 MB) is referenced nowhere.
Safe to delete.

---

## 6. Delivery

1. Create the folder `public/images/_incoming/`
2. Drop the 8 files in, named exactly `01-waschmaschine.png` … `08-hero.png`
3. Any resolution **at or above** the target is fine — bigger is better, I downscale.
   Don't upscale a small render.
4. Tell me they're in, and I'll take it from there.

### Summary table

| # | File | Format | Size | Alpha | Notes |
|---|---|---|---|---|---|
| 1 | `01-waschmaschine.png` | 3:2 | 1536×1024 | no | subject in LEFT half |
| 2 | `02-herd-backofen.png` | 3:2 | 1536×1024 | no | centred crop |
| 3 | `03-trockner.png` | 3:2 | 1536×1024 | no | or 1:1 cutout, your call |
| 4 | `04-kuehlschrank.png` | 1:1 | 2000×2000 | **yes** | on red stage + banner right |
| 5 | `05-spuelmaschine.png` | 1:1 | 2000×2000 | **yes** | on white stage |
| 6 | `06-kaffeemaschine.png` | 1:1 | 2000×2000 | **yes** | on red stage + banner left |
| 7 | `07-tv-elektronik.png` | 1:1 | 2000×2000 | **yes** | on white stage |
| 8 | `08-hero.png` | 1:1 | 2000×2000 | **yes** | hero, on `#b42318` |

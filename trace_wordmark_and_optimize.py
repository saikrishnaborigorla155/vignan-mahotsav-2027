import cv2
import numpy as np
import os
from PIL import Image

processed_dir = r"d:\back up drive\OneDrive\Desktop\m2777\processed_assets"
final_assets_dir = r"d:\back up drive\OneDrive\Desktop\m2777\app_assets"
os.makedirs(final_assets_dir, exist_ok=True)

# 1. Crop transparent images to bounding box of content
for fname in os.listdir(processed_dir):
    if not fname.endswith(".png"):
        continue
    fpath = os.path.join(processed_dir, fname)
    im = Image.open(fpath)
    # Bounding box of alpha channel > 10
    alpha = np.array(im)[:, :, 3]
    y_idx, x_idx = np.where(alpha > 10)
    if len(y_idx) > 0:
        bbox = (x_idx.min(), y_idx.min(), x_idx.max() + 1, y_idx.max() + 1)
        # Pad slightly if within bounds
        cropped = im.crop(bbox)
        out_path = os.path.join(final_assets_dir, fname)
        cropped.save(out_path, "PNG")
        print(f"Trimmed & saved {fname}: {cropped.size}")

# Copy jpg backgrounds too
for fname in ["sky_bg.jpg", "official_poster.jpg"]:
    src = os.path.join(processed_dir, fname)
    if os.path.exists(src):
        Image.open(src).save(os.path.join(final_assets_dir, fname), "JPEG", quality=92)
        print(f"Saved {fname}")

# 2. Trace MAHOTSAV wordmark to SVG path
wm_path = os.path.join(final_assets_dir, "mahotsav_wordmark.png")
im_wm = cv2.imread(wm_path, cv2.IMREAD_GRAYSCALE)
h, w = im_wm.shape
# Threshold: dark letters (< 128) vs background (> 128)
_, thresh = cv2.threshold(im_wm, 128, 255, cv2.THRESH_BINARY_INV)

# Find contours with hierarchy
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_KCOS)

svg_paths = []
for i, cnt in enumerate(contours):
    # Simplify slightly for smooth rendering
    epsilon = 0.8
    approx = cv2.approxPolyDP(cnt, epsilon, True)
    if len(approx) < 3:
        continue
    d = []
    for j, pt in enumerate(approx):
        x, y = pt[0]
        cmd = "M" if j == 0 else "L"
        d.append(f"{cmd}{x} {y}")
    d.append("Z")
    svg_paths.append(" ".join(d))

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" class="mahotsav-svg-wordmark" fill="currentColor">
  <path d="{" ".join(svg_paths)}" fill-rule="evenodd" />
</svg>'''

with open(os.path.join(final_assets_dir, "mahotsav_wordmark.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)
print(f"Generated mahotsav_wordmark.svg: viewBox='0 0 {w} {h}', {len(svg_paths)} paths")

# Also trace shooting star
star_path = os.path.join(final_assets_dir, "shooting_star.png")
if os.path.exists(star_path):
    im_star = cv2.imread(star_path, cv2.IMREAD_GRAYSCALE)
    sh, sw = im_star.shape
    _, thresh_star = cv2.threshold(im_star, 128, 255, cv2.THRESH_BINARY_INV)
    star_cnts, _ = cv2.findContours(thresh_star, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)
    star_paths = []
    for cnt in star_cnts:
        approx = cv2.approxPolyDP(cnt, 0.8, True)
        if len(approx) < 3:
            continue
        d = []
        for j, pt in enumerate(approx):
            x, y = pt[0]
            cmd = "M" if j == 0 else "L"
            d.append(f"{cmd}{x} {y}")
        d.append("Z")
        star_paths.append(" ".join(d))
    star_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {sw} {sh}" class="shooting-star-svg" fill="currentColor">
  <path d="{" ".join(star_paths)}" />
</svg>'''
    with open(os.path.join(final_assets_dir, "shooting_star.svg"), "w", encoding="utf-8") as f:
        f.write(star_svg)
    print(f"Generated shooting_star.svg: viewBox='0 0 {sw} {sh}'")

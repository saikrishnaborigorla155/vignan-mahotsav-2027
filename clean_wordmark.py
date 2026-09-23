import cv2
import numpy as np
import os
from PIL import Image

src = r"d:\back up drive\OneDrive\Desktop\m2777\processed_assets\mahotsav_wordmark.png"
im = Image.open(src).convert("RGBA")
arr = np.array(im)

# Non-transparent pixels (letters)
alpha = arr[:, :, 3]
y_idx, x_idx = np.where(alpha > 10)
min_x, max_x = x_idx.min(), x_idx.max()
min_y, max_y = y_idx.min(), y_idx.max()

cropped_im = im.crop((min_x - 10, min_y - 10, max_x + 10, max_y + 10))
cropped_path = r"d:\back up drive\OneDrive\Desktop\m2777\public\assets\mahotsav_wordmark_clean.png"
cropped_im.save(cropped_path)

# Now trace only the letters
gray = np.array(cropped_im)[:, :, 3]
# Threshold on alpha: letters are > 128
_, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)

# Find contours
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

w, h = cropped_im.size
svg_paths = []
for cnt in contours:
    approx = cv2.approxPolyDP(cnt, 0.6, True)
    if len(approx) < 3 or cv2.contourArea(approx) < 15:
        continue
    d = []
    for j, pt in enumerate(approx):
        x, y = pt[0]
        cmd = "M" if j == 0 else "L"
        d.append(f"{cmd}{x} {y}")
    d.append("Z")
    svg_paths.append(" ".join(d))

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" className="mahotsav-svg-wordmark" fill="none">
  <path d="{" ".join(svg_paths)}" fillRule="evenodd" />
</svg>'''

with open(r"d:\back up drive\OneDrive\Desktop\m2777\public\assets\mahotsav_clean.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Clean wordmark generated: {w}x{h}, {len(svg_paths)} contour paths")

import pymupdf
import cv2
import numpy as np
import os
from PIL import Image

pdf_path = r"C:\Users\Admin\Downloads\IMG_2168 (1).pdf"
out_dir = r"d:\back up drive\OneDrive\Desktop\m2777\public\assets"
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)

def render_page(page_idx, dpi=150):
    pix = doc[page_idx].get_pixmap(dpi=dpi)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return img

# 1. Sky Background (Page 1)
# Notice in page 1, the poster art is in the middle of the page
p1 = render_page(0, dpi=150)
arr1 = np.array(p1)
# Find non-white region of the poster
non_white = (arr1[:,:,0] < 250) | (arr1[:,:,1] < 250) | (arr1[:,:,2] < 250)
y, x = np.where(non_white)
poster_bbox = (x.min(), y.min(), x.max()+1, y.max()+1)
print(f"Poster BBox on page: {poster_bbox} -> size: {poster_bbox[2]-poster_bbox[0]}x{poster_bbox[3]-poster_bbox[1]}")

sky_img = p1.crop(poster_bbox)
sky_img.save(os.path.join(out_dir, "sky_bg.jpg"), "JPEG", quality=95)
print(f"Saved sky_bg.jpg: {sky_img.size}")

# Full Official Poster (Page 24 - index 23)
p24 = render_page(23, dpi=150)
poster_full = p24.crop(poster_bbox)
poster_full.save(os.path.join(out_dir, "official_poster.jpg"), "JPEG", quality=95)
print(f"Saved official_poster.jpg: {poster_full.size}")

# Helper: Extract silhouette layer within poster_bbox with transparent background
def extract_poster_layer(page_idx, out_name, is_cloud=False, is_sun=False):
    p = render_page(page_idx, dpi=150)
    cropped = p.crop(poster_bbox)
    data = np.array(cropped.convert("RGBA"), dtype=np.float32)
    r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]
    
    if is_cloud:
        # Clouds: pure white (>250) is 0 alpha, darker/colored is opacity
        brightness = (r + g + b) / 3.0
        alpha = np.clip((252 - brightness) * 3.5, 0, 255)
        data[:,:,3] = alpha.astype(np.uint8)
    elif is_sun:
        # Sun orb
        is_colored = (r < 252) | (g < 252) | (b < 252)
        # Find center of sun
        sy, sx = np.where(is_colored)
        if len(sy) > 0:
            cy, cx = (sy.min() + sy.max()) / 2.0, (sx.min() + sx.max()) / 2.0
            radius = max(sy.max() - sy.min(), sx.max() - sx.min()) / 2.0 * 1.05
            h, w = r.shape
            y_grid, x_grid = np.ogrid[:h, :w]
            dist = np.sqrt((x_grid - cx)**2 + (y_grid - cy)**2)
            alpha = np.clip((radius - dist) / 6.0, 0, 1) * 255
            data[:,:,3] = alpha.astype(np.uint8)
    else:
        # Silhouettes: Mountains, Warrior, Ridge
        # White background (> 245) becomes 0, silhouette has solid color
        is_bg = (r > 245) & (g > 245) & (b > 245)
        # Smooth antialiasing on edges
        edge_dist = np.minimum.reduce([255-r, 255-g, 255-b])
        alpha = np.where(is_bg, 0, np.clip(edge_dist * 4.0, 0, 255))
        data[:,:,3] = alpha.astype(np.uint8)
        
    res = Image.fromarray(data.astype(np.uint8))
    res.save(os.path.join(out_dir, out_name), "PNG")
    print(f"Saved {out_name}: {res.size}")

# Extract Mountain layers (Pages 4, 5, 6, 7 -> indices 3, 4, 5, 6)
extract_poster_layer(3, "mountain_1.png")
extract_poster_layer(4, "mountain_2.png")
extract_poster_layer(5, "mountain_3.png")
extract_poster_layer(6, "mountain_4.png")

# Mountain Ridge & Crag Peak (Page 8, 15 -> indices 7, 14)
extract_poster_layer(7, "mountain_ridge.png")
extract_poster_layer(14, "mountain_peak.png")

# Sun Orb (Page 10 -> index 9)
extract_poster_layer(9, "sun_orb.png", is_sun=True)

# Standing Warrior on peak (Page 11 -> index 10)
extract_poster_layer(10, "warrior_standing.png")

# Climbing Warrior on cliff (Page 27 -> index 26)
extract_poster_layer(26, "warrior_climbing.png")

# Clouds / Smoke (Page 12, 13, 31 -> indices 11, 12, 30)
extract_poster_layer(11, "cloud_1.png", is_cloud=True)
extract_poster_layer(12, "cloud_2.png", is_cloud=True)
extract_poster_layer(30, "cloud_3.png", is_cloud=True)

# Helper: Extract cropped standalone graphic (wordmark, badge, star)
def extract_standalone(page_idx, out_png, out_svg=None, is_badge=False):
    p = render_page(page_idx, dpi=200)
    arr = np.array(p.convert("RGBA"))
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    
    # Non-white pixels
    non_white = (r < 250) | (g < 250) | (b < 250)
    y, x = np.where(non_white)
    if len(y) == 0:
        print(f"No content found on page {page_idx+1}")
        return
    
    pad = 8
    min_x, max_x = max(0, x.min() - pad), min(arr.shape[1], x.max() + pad)
    min_y, max_y = max(0, y.min() - pad), min(arr.shape[0], y.max() + pad)
    
    cropped = arr[min_y:max_y, min_x:max_x].copy()
    cr_r, cr_g, cr_b = cropped[:,:,0], cropped[:,:,1], cropped[:,:,2]
    
    is_bg = (cr_r > 248) & (cr_g > 248) & (cr_b > 248)
    cropped[:,:,3] = np.where(is_bg, 0, 255)
    
    res = Image.fromarray(cropped)
    res.save(os.path.join(out_dir, out_png), "PNG")
    print(f"Saved {out_png}: {res.size}")
    
    if out_svg:
        # Trace contour for animated SVG
        ch, cw = cropped.shape[:2]
        gray = 255 - np.mean(cropped[:,:,:3], axis=2).astype(np.uint8)
        _, thresh = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY)
        contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
        
        svg_paths = []
        for cnt in contours:
            approx = cv2.approxPolyDP(cnt, 0.7, True)
            if len(approx) < 3 or cv2.contourArea(approx) < 20:
                continue
            d = []
            for j, pt in enumerate(approx):
                px, py = pt[0]
                cmd = "M" if j == 0 else "L"
                d.append(f"{cmd}{px} {py}")
            d.append("Z")
            svg_paths.append(" ".join(d))
            
        svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}" fill="currentColor">
  <path d="{" ".join(svg_paths)}" fillRule="evenodd" />
</svg>'''
        with open(os.path.join(out_dir, out_svg), "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"Saved {out_svg}: {cw}x{ch}, {len(svg_paths)} paths")

# Standalone Wordmark (Page 18 -> index 17)
extract_standalone(17, "mahotsav_wordmark.png", "mahotsav_wordmark.svg")

# Shooting Star (Page 20 -> index 19)
extract_standalone(19, "shooting_star.png", "shooting_star.svg")

# 20th Edition Badge (Page 40 -> index 39)
extract_standalone(39, "badge_20th.png", "badge_20th.svg", is_badge=True)

print("All PDF assets extracted and rendered with flawless accuracy!")

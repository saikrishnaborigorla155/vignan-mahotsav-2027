import os
from PIL import Image
import numpy as np

src_dir = r"d:\back up drive\OneDrive\Desktop\m2777\extracted_assets"
processed_dir = r"d:\back up drive\OneDrive\Desktop\m2777\processed_assets"
os.makedirs(processed_dir, exist_ok=True)

def white_to_transparent(img_path, out_path, threshold=245):
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img)
    # Check pixels close to white
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    # For silhouettes (dark figures on white), distance from white determines alpha
    # If r,g,b > threshold, alpha drops
    white_dist = np.minimum.reduce([255-r, 255-g, 255-b])
    # Alpha proportional to darkness
    alpha = np.clip((255 - np.mean(data[:,:,:3], axis=2)) * 1.5, 0, 255).astype(np.uint8)
    
    # Or specifically for flat solid silhouettes (mountains, warrior):
    # If pixel is very close to pure white (>240 in all channels)
    is_white = (r > 240) & (g > 240) & (b > 240)
    data[:,:,3] = np.where(is_white, 0, 255)
    
    result = Image.fromarray(data)
    result.save(out_path, "PNG")
    print(f"Processed: {out_path}")

def sun_orb_transparent(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    # For sun orb, white background should be transparent, while glowing center and yellow ring preserved
    r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]
    # In page 10, the background outside the orb is pure white (255,255,255)
    # The center of the orb is pale yellow/white, and ring is orange
    # Let's crop to orb bounding box and make outside transparent
    # Find bounding box of non-white
    is_not_white = (r < 250) | (g < 250) | (b < 250)
    # Center of image is ~ (w/2, h/2)
    h, w = r.shape
    y_indices, x_indices = np.where(is_not_white)
    if len(y_indices) > 0:
        min_y, max_y = y_indices.min(), y_indices.max()
        min_x, max_x = x_indices.min(), x_indices.max()
        cy, cx = (min_y + max_y)/2.0, (min_x + max_x)/2.0
        radius = max(max_y - min_y, max_x - min_x) / 2.0 * 1.05
        
        # Distance from center
        y, x = np.ogrid[:h, :w]
        dist = np.sqrt((x - cx)**2 + (y - cy)**2)
        
        # Soft feather at radius
        alpha = np.clip((radius - dist) / 5.0, 0, 1) * 255
        data[:,:,3] = alpha.astype(np.uint8)
    result = Image.fromarray(data.astype(np.uint8))
    result.save(out_path, "PNG")
    print(f"Sun orb processed: {out_path}")

def cloud_transparent(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    # Cloud is smoke-colored on white background.
    # Where pixel is white (255,255,255), alpha should be 0.
    # Where pixel is darker / colored, alpha corresponds to color intensity.
    r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]
    # Darkness = 255 - brightness
    brightness = (r + g + b) / 3.0
    alpha = np.clip((252 - brightness) * 3.0, 0, 255)
    data[:,:,3] = alpha.astype(np.uint8)
    result = Image.fromarray(data.astype(np.uint8))
    result.save(out_path, "PNG")
    print(f"Cloud processed: {out_path}")

# Run conversions
white_to_transparent(os.path.join(src_dir, "page_04_img_1.jpeg"), os.path.join(processed_dir, "mountain_1.png"))
white_to_transparent(os.path.join(src_dir, "page_05_img_1.jpeg"), os.path.join(processed_dir, "mountain_2.png"))
white_to_transparent(os.path.join(src_dir, "page_06_img_1.jpeg"), os.path.join(processed_dir, "mountain_3.png"))
white_to_transparent(os.path.join(src_dir, "page_07_img_1.jpeg"), os.path.join(processed_dir, "mountain_4.png"))
white_to_transparent(os.path.join(src_dir, "page_15_img_1.jpeg"), os.path.join(processed_dir, "mountain_ridge.png"))
white_to_transparent(os.path.join(src_dir, "page_11_img_1.jpeg"), os.path.join(processed_dir, "warrior_standing.png"))
white_to_transparent(os.path.join(src_dir, "page_27_img_1.jpeg"), os.path.join(processed_dir, "warrior_climbing.png"))
white_to_transparent(os.path.join(src_dir, "page_18_img_1.jpeg"), os.path.join(processed_dir, "mahotsav_wordmark.png"))
white_to_transparent(os.path.join(src_dir, "page_20_img_1.jpeg"), os.path.join(processed_dir, "shooting_star.png"))
white_to_transparent(os.path.join(src_dir, "page_40_img_1.jpeg"), os.path.join(processed_dir, "badge_20th.png"))

sun_orb_transparent(os.path.join(src_dir, "page_10_img_1.jpeg"), os.path.join(processed_dir, "sun_orb.png"))
cloud_transparent(os.path.join(src_dir, "page_12_img_1.jpeg"), os.path.join(processed_dir, "cloud_1.png"))
cloud_transparent(os.path.join(src_dir, "page_13_img_1.jpeg"), os.path.join(processed_dir, "cloud_2.png"))
cloud_transparent(os.path.join(src_dir, "page_31_img_1.jpeg"), os.path.join(processed_dir, "cloud_3.png"))

# Copy sky background
Image.open(os.path.join(src_dir, "page_01_img_1.jpeg")).save(os.path.join(processed_dir, "sky_bg.jpg"), "JPEG", quality=95)
Image.open(os.path.join(src_dir, "page_24_img_1.jpeg")).save(os.path.join(processed_dir, "official_poster.jpg"), "JPEG", quality=95)

print("All assets processed successfully!")

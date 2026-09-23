import os
import pymupdf
from PIL import Image

pdf_path = r"C:\Users\Admin\Downloads\IMG_2168 (1).pdf"
out_dir = r"d:\back up drive\OneDrive\Desktop\m2777\extracted_assets"
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)
print(f"Total pages: {len(doc)}")

for i, page in enumerate(doc):
    images = page.get_images()
    for j, img in enumerate(images):
        xref = img[0]
        base_img = doc.extract_image(xref)
        img_bytes = base_img["image"]
        ext = base_img["ext"]
        out_path = os.path.join(out_dir, f"page_{i+1:02d}_img_{j+1}.{ext}")
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        print(f"Saved: Page {i+1} -> {out_path} ({base_img['width']}x{base_img['height']})")

print("Done extracting images.")

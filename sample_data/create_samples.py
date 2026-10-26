"""
Utility script to generate sample test images for the Multimodal Construction Intelligence Platform.
"""
from PIL import Image, ImageDraw, ImageFont
import os

sample_dir = os.path.dirname(os.path.abspath(__file__))

def create_sample_safety():
    img = Image.new("RGB", (640, 480), color=(45, 55, 72))
    draw = ImageDraw.Draw(img)
    # Draw scaffold frame
    for y in range(80, 420, 80):
        draw.line([(60, y), (580, y)], fill=(200, 200, 200), width=4)
    for x in range(60, 600, 130):
        draw.line([(x, 80), (x, 420)], fill=(200, 200, 200), width=4)
    # Diagonal braces
    draw.line([(60, 80), (190, 160)], fill=(220, 220, 220), width=3)
    draw.line([(190, 80), (60, 160)], fill=(220, 220, 220), width=3)
    # Caution area
    draw.rectangle([(220, 200), (420, 320)], fill=(245, 158, 11))
    draw.text((70, 40), "ZONE 4 HIGH-RISE SCAFFOLDING & PPE CHECK", fill=(255, 255, 255))
    img.save(os.path.join(sample_dir, "sample_safety_inspection.jpg"))

def create_sample_crack():
    img = Image.new("RGB", (640, 480), color=(160, 174, 192))
    draw = ImageDraw.Draw(img)
    # Concrete shear wall texture
    for i in range(0, 640, 20):
        draw.line([(i, 0), (i, 480)], fill=(145, 158, 175), width=1)
    # Diagonal shear crack
    points = [(120, 60), (220, 150), (280, 200), (340, 280), (450, 380), (520, 440)]
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=(30, 41, 59), width=5)
    draw.text((80, 30), "FORENSIC SAMPLE: RC BEAM SHEAR CRACK", fill=(15, 23, 42))
    img.save(os.path.join(sample_dir, "sample_structural_crack.jpg"))

def create_sample_building():
    img = Image.new("RGB", (640, 480), color=(226, 232, 240))
    draw = ImageDraw.Draw(img)
    # Sky
    draw.rectangle([(0, 0), (640, 200)], fill=(186, 230, 253))
    # Modern Commercial Building facade
    draw.rectangle([(160, 80), (480, 460)], fill=(30, 41, 59))
    # Glass curtain wall panels
    for y in range(110, 440, 40):
        for x in range(180, 460, 50):
            draw.rectangle([(x, y), (x + 35, y + 25)], fill=(147, 197, 253))
    draw.text((170, 40), "PRIME METRO COMMERCIAL TOWER FACADE", fill=(15, 23, 42))
    img.save(os.path.join(sample_dir, "sample_commercial_building.jpg"))

if __name__ == "__main__":
    create_sample_safety()
    create_sample_crack()
    create_sample_building()
    print("Generated sample images successfully in sample_data/.")

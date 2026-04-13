import os
from database import get_database
from auth import hash_password
from datetime import datetime

async def seed_data():
    db = get_database()
    
    # Check if we already seeded 40 products
    products_count = await db["products"].count_documents({})
    # Check if we already seeded 40 products
    products_count = await db["products"].count_documents({})
    if products_count < 40:
        # Clear existing to re-seed cleanly with the 40 products
        await db["products"].delete_many({})
        print("Cleared old sample products")
        
        frontend_images_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "images", "products")
        
        products_seed = []
        
        categories = ["Weaving Parts", "Cutting Parts", "Motion Parts", "Jacquard Parts", "Dobby Parts", "Carriers", "Stop Motion", "Reeds"]
        brands = ["SOMET", "VAMATEX", "SULZER", "BONAS", "STAUBLI", "GENERAL"]
        
        if os.path.exists(frontend_images_dir):
            images = [f for f in os.listdir(frontend_images_dir) if f.startswith("p") and f.endswith(".png")]
            # Sort naturally so p1, p2, p10... works correctly
            import re
            def atoi(text): return int(text) if text.isdigit() else text
            def natural_keys(text): return [atoi(c) for c in re.split(r'(\d+)', text)]
            images.sort(key=natural_keys)
            
            for index, img_file in enumerate(images, start=1):
                guessed_category = categories[index % len(categories)]
                guessed_brand = brands[index % len(brands)]
                
                # Check if it's p{index}.png to keep everything perfectly aligned
                p = {
                    "brand": guessed_brand,
                    "name": f"Om Tex Assorted Part #{index}",
                    "part_number": f"OT-PT-{index:03d}",
                    "category": guessed_category,
                    "description": f"Quality {guessed_category.lower()} for {guessed_brand} machines. Contact us with the part number for technical details.",
                    "is_featured": index <= 4,
                    "image_url": f"/images/products/{img_file}",
                    "product_no": index,
                    "created_at": datetime.utcnow()
                }
                products_seed.append(p)
                
        if products_seed:
            await db["products"].insert_many(products_seed)
            print(f"Seeded {len(products_seed)} original products from screenshots")
        else:
            print("No images found to seed products.")

    # User
    if await db["users"].count_documents({}) == 0:
        admin_username = os.getenv("ADMIN_USERNAME", "admin")
        admin_password = os.getenv("ADMIN_PASSWORD", "omtex@2024")
        password_hash = hash_password(admin_password)
        await db["users"].insert_one({
            "username": admin_username,
            "password_hash": password_hash
        })
        print("Seeded admin user")

    # Config
    if await db["config"].count_documents({}) == 0:
        admin_whatsapp = os.getenv("ADMIN_WHATSAPP", "918222085999")
        await db["config"].insert_one({
            "admin_whatsapp": admin_whatsapp,
            "company_phone": "+91 99999 99999",
            "company_email": "info@omtexspares.com",
            "company_address": "Surat, Gujarat, India"
        })
        print("Seeded app config")

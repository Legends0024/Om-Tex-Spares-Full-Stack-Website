import os
from database import get_database
from auth import hash_password
from datetime import datetime

async def seed_data():
    db = get_database()
    
    # Products Seed
    frontend_images_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "images", "products")
    products_seed = []
    
    if os.path.exists(frontend_images_dir):
        categories = ["Weaving Parts", "Cutting Parts", "Motion Parts", "Jacquard Parts", "Dobby Parts", "Carriers", "Stop Motion", "Reeds"]
        brands = ["SOMET", "VAMATEX", "SULZER", "BONAS", "STAUBLI", "GENERAL"]
        images = [f for f in os.listdir(frontend_images_dir) if f.startswith("p") and f.endswith(".png")]
        
        import re
        def atoi(text): return int(text) if text.isdigit() else text
        def natural_keys(text): return [atoi(c) for c in re.split(r'(\d+)', text)]
        images.sort(key=natural_keys)
        
        for index, img_file in enumerate(images, start=1):
            p = {
                "brand": brands[index % len(brands)],
                "name": f"Om Tex Assorted Part #{index}",
                "part_number": f"OT-PT-{index:03d}",
                "category": categories[index % len(categories)],
                "description": f"Quality part for weaving machines. Engineered for precision and durability.",
                "is_featured": index <= 6, # Featured a few more
                "image_url": f"/images/products/{img_file}",
                "product_no": index,
                "created_at": datetime.utcnow()
            }
            products_seed.append(p)
    
    # Only update database if we have data and count is off
    current_count = await db["products"].count_documents({})
    if products_seed and (current_count == 0 or current_count < len(products_seed)):
        await db["products"].delete_many({})
        await db["products"].insert_many(products_seed)
        print(f"Successfully seeded {len(products_seed)} products.")
    elif current_count > 0:
        print(f"Database already has {current_count} products. Skipping seed.")
    else:
        print("Warning: No product images found. Database remains empty.")

    # NEW: Admin Users (replaces old users)
    if await db["admin_users"].count_documents({}) == 0:
        admins = [
            {"username": "admin", "password": "omtex@2024", "full_name": "Om Tex Admin", "role": "super_admin", "email": "admin@omtexspares.com"},
            {"username": "sales", "password": "sales@2024", "full_name": "Sales Manager", "role": "admin", "email": "sales@omtexspares.com"},
            {"username": "viewer", "password": "view@2024", "full_name": "View Only User", "role": "viewer", "email": "viewer@omtexspares.com"}
        ]
        seed_users = []
        for a in admins:
            seed_users.append({
                "username": a["username"],
                "password_hash": hash_password(a["password"]),
                "full_name": a["full_name"],
                "role": a["role"],
                "email": a["email"],
                "phone": "918222085999",
                "is_active": True,
                "created_at": datetime.utcnow(),
                "last_login": None
            })
        await db["admin_users"].insert_many(seed_users)
        print("Seeded admin users")

    # NEW: Customers
    if await db["customers"].count_documents({}) == 0:
        customers = [
            {"company_name": "Ravi Textiles Pvt Ltd", "primary_contact": "Ravi Sharma", "email": "ravi@ravitextiles.com", "phone": "919876543210", "status": "active"},
            {"company_name": "Gupta Weaving Works", "primary_contact": "Sunil Gupta", "email": "sunil@guptaweaving.com", "phone": "919765432109", "status": "prospect"},
            {"company_name": "Maharashtra Mills", "primary_contact": "Priya Desai", "email": "priya@mhmills.com", "phone": "919654321098", "status": "active"},
            {"company_name": "Rajasthan Fabrics", "primary_contact": "Amit Joshi", "email": "amit@rajfabrics.com", "phone": "919543210987", "status": "inactive"},
            {"company_name": "South India Looms", "primary_contact": "Kavitha Nair", "email": "kavitha@silooms.com", "phone": "919432109876", "status": "prospect"}
        ]
        for c in customers:
            c["whatsapp"] = c["phone"]
            c["address"] = "India"
            c["notes"] = "Sample customer"
            c["created_at"] = datetime.utcnow()
            c["created_by"] = "admin"
        await db["customers"].insert_many(customers)
        print("Seeded customers")

    # NEW: Leads
    if await db["leads"].count_documents({}) == 0:
        leads = [
            {"name": "Deepak Patel", "company": "DP Textiles", "phone": "919321098765", "source": "WhatsApp", "status": "new"},
            {"name": "Meera Shah", "company": "Shah Fabrics", "phone": "919210987654", "source": "Website", "status": "contacted"},
            {"name": "Ramesh Kumar", "company": "Kumar Mills", "phone": "919109876543", "source": "Referral", "status": "qualified"},
            {"name": "Sunita Reddy", "company": "Reddy Weaves", "phone": "919098765432", "source": "Exhibition", "status": "new"},
            {"name": "Farhan Sheikh", "company": "Sheikh Textiles", "phone": "918987654321", "source": "Cold Call", "status": "contacted"}
        ]
        for l in leads:
            l["email"] = f"{l['name'].lower().replace(' ', '.')}@example.com"
            l["notes"] = "Sample lead"
            l["created_at"] = datetime.utcnow()
            l["assigned_to"] = "sales"
        await db["leads"].insert_many(leads)
        print("Seeded leads")

    # NEW: Deals
    if await db["deals"].count_documents({}) == 0:
        deals = [
            {"title": "Rapier Head Supply - Ravi Textiles", "customer_name": "Ravi Textiles Pvt Ltd", "stage": "Quoted", "value": 85000},
            {"title": "Gripper Band Bulk Order - Maharashtra Mills", "customer_name": "Maharashtra Mills", "stage": "Won", "value": 42000},
            {"title": "Jacquard Hook Set - Gupta Weaving", "customer_name": "Gupta Weaving Works", "stage": "Inquiry", "value": 28000},
            {"title": "Projectile Supply - South India Looms", "customer_name": "South India Looms", "stage": "Negotiation", "value": 63000},
            {"title": "Dobby Module - Rajasthan Fabrics", "customer_name": "Rajasthan Fabrics", "stage": "Lost", "value": 35000}
        ]
        for d in deals:
            d["customer_id"] = "placeholder"
            d["product_names"] = ["SOMET Spare", "VAMATEX Part"]
            d["notes"] = "Sample deal"
            d["created_at"] = datetime.utcnow()
            d["updated_at"] = datetime.utcnow()
        await db["deals"].insert_many(deals)
        print("Seeded deals")

    # Config
    if await db["config"].count_documents({}) == 0:
        admin_whatsapp = os.getenv("ADMIN_WHATSAPP", "918222085999")
        await db["config"].insert_one({
            "admin_whatsapp": admin_whatsapp,
            "company_phone": "+91 82220 85999",
            "company_email": "info@omtexspares.com",
            "company_address": "Surat, Gujarat, India"
        })
        print("Seeded app config")

import asyncio
from database import get_database
from dotenv import load_dotenv
import os

load_dotenv()

async def update_phone():
    db = get_database()
    result = await db["config"].update_one(
        {}, 
        {"$set": {"company_phone": "+91 82220 85999"}}
    )
    print(f"Matched: {result.matched_count}, Modified: {result.modified_count}")

if __name__ == "__main__":
    asyncio.run(update_phone())

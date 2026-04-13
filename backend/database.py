import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "omtexspares") # Default added here

if not MONGO_URL:
    print("CRITICAL ERROR: MONGO_URL is not set in environment variables.")

client = None
if MONGO_URL:
    try:
        client = AsyncIOMotorClient(MONGO_URL)
    except Exception as e:
        print(f"DATABASE CONFIGURATION ERROR: {e}")

def get_database():
    if not MONGO_URL:
        raise Exception("CRITICAL: MONGO_URL environment variable is missing!")
    if not client:
        raise Exception("Database client not initialized. Check your MONGO_URL.")
    return client[DATABASE_NAME]

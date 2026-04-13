import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGO_URL or not DATABASE_NAME:
    print("CRITICAL ERROR: MONGO_URL or DATABASE_NAME is not set in environment variables.")
    # We don't exit here to let main.py catch it and print more logs, 
    # but we provide the warning.

client = None
if MONGO_URL:
    try:
        client = AsyncIOMotorClient(MONGO_URL)
    except Exception as e:
        print(f"DATABASE CONFIGURATION ERROR: {e}")

def get_database():
    if not client:
        raise Exception("Database client not initialized. Check your MONGO_URL environment variable.")
    return client[DATABASE_NAME]

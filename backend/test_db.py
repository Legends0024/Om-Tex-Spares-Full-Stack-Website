import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import sys

async def ping():
    client = AsyncIOMotorClient("mongodb+srv://cedur:%3Comtex0024%3E@cedur-project.jxsaqb0.mongodb.net/?appName=CEDUR-PROJECT")
    try:
        await client.admin.command('ping')
        print("Connected successfully with <omtex0024> password!")
        sys.exit(0)
    except Exception as e:
        print(f"Error 1: {e}")
        
    client2 = AsyncIOMotorClient("mongodb+srv://cedur:omtex0024@cedur-project.jxsaqb0.mongodb.net/?appName=CEDUR-PROJECT")
    try:
        await client2.admin.command('ping')
        print("Connected successfully with omtex0024 password!")
        sys.exit(0)
    except Exception as e:
        print(f"Error 2: {e}")

asyncio.run(ping())

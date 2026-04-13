import asyncio
import os
from seed import seed_data
from dotenv import load_dotenv

# Ensure we are in the backend directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))
load_dotenv()

async def run_seed():
    print("Starting local seed to sync MongoDB Atlas with clean filenames...")
    try:
        await seed_data()
        print("Success: Database updated with p1.png...p40.png")
    except Exception as e:
        print(f"Error during seeding: {e}")

if __name__ == "__main__":
    asyncio.run(run_seed())

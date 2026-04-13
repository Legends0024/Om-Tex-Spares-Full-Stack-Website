from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routers import auth_router, products_router, enquiries_router, access_router, config_router
from seed import seed_data

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await seed_data()
    yield
    # Shutdown

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api")
app.include_router(products_router.router, prefix="/api")
app.include_router(enquiries_router.router, prefix="/api")
app.include_router(access_router.router, prefix="/api")
app.include_router(config_router.router, prefix="/api")

@app.get("/")
async def root():
    return {"status": "OM TEX SPARES API running"}

from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

from winxi.users.router import router as users_router
from winxi.auth.router import router as auth_router
from winxi.moodboards.router import router as moodboards_router


def include_router(app):
    app.include_router(auth_router)
    app.include_router(users_router)
    app.include_router(moodboards_router)


app = FastAPI(title="Winxi API", version="0.1.0")
include_router(app)


@app.get("/")
def read_root():
    return {"message": "Welcome to Winxi API", "docs": "/docs"}


@app.get("/health")
def health_check():
    return {"status": "ok"}

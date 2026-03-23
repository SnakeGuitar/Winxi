from fastapi import HTTPException
from sqlalchemy.orm import Session
from .models import Moodboards, Image
from .schemas import MoodboardCreate, MoodboardUpdate, ImageCreate
from winxi.moodboards import repository

def get_moodboards(db: Session, user_id: int):
    return repository.get_moodboards(db, user_id)

def get_moodboard(db: Session, moodboard_id: int):
    return repository.get_moodboard(db, moodboard_id)

def get_user_moodboard(db: Session, moodboard_id: int, user_id: int) -> Moodboards:
    """Get moodboard and verify ownership, raise 404 if not found or unauthorized."""
    db_moodboard = repository.get_moodboard(db, moodboard_id)
    if db_moodboard is None or db_moodboard.user_id != user_id:
        raise HTTPException(status_code=404, detail="Moodboard not found")
    return db_moodboard

def create_moodboard(db: Session, moodboard: MoodboardCreate, user_id: int):
    moodboard_data = moodboard.model_dump()
    moodboard_data["user_id"] = user_id
    return repository.create_moodboard(db, moodboard_data)

def update_moodboard(db: Session, db_moodboard: Moodboards, moodboard_update: MoodboardUpdate):
    update_data = moodboard_update.model_dump(exclude_unset=True)
    return repository.update_moodboard(db, db_moodboard, update_data)

def delete_moodboard(db: Session, db_moodboard: Moodboards):
    return repository.delete_moodboard(db, db_moodboard)

# Image operations
def add_image_to_moodboard(db: Session, image: ImageCreate):
    return repository.create_image(db, image.model_dump())

def get_user_image(db: Session, image_id: int, user_id: int) -> Image:
    """Get image and verify ownership, raise 404 if not found or unauthorized."""
    db_image = repository.get_image(db, image_id)
    if not db_image or db_image.moodboard.user_id != user_id:
        raise HTTPException(status_code=404, detail="Image not found")
    return db_image

def delete_image(db: Session, db_image: Image):
    """Delete image by object (avoids double query)."""
    return repository.delete_image(db, db_image)

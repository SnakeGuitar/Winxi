from sqlalchemy.orm import Session
from winxi.moodboards.models import Moodboards, Image

# Moodboard operations
def get_moodboards(db: Session, user_id: int):
    return db.query(Moodboards).filter(Moodboards.user_id == user_id).all()

def get_moodboard(db: Session, moodboard_id: int):
    return db.query(Moodboards).filter(Moodboards.id == moodboard_id).first()

def create_moodboard(db: Session, moodboard_data: dict):
    db_moodboard = Moodboards(**moodboard_data)
    db.add(db_moodboard)
    db.commit()
    db.refresh(db_moodboard)
    return db_moodboard

def update_moodboard(db: Session, db_moodboard: Moodboards, update_data: dict):
    for key, value in update_data.items():
        setattr(db_moodboard, key, value)
    db.commit()
    db.refresh(db_moodboard)
    return db_moodboard

def delete_moodboard(db: Session, db_moodboard: Moodboards):
    db.delete(db_moodboard)
    db.commit()
    return True

# Image operations
def create_image(db: Session, image_data: dict):
    db_image = Image(**image_data)
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

def get_image(db: Session, image_id: int):
    return db.query(Image).filter(Image.id == image_id).first()

def delete_image(db: Session, db_image: Image):
    db.delete(db_image)
    db.commit()
    return True

from sqlalchemy.orm import Session
from .models import Moodboards, Image
from .schemas import MoodboardCreate, MoodboardUpdate, ImageCreate

def get_moodboards(db: Session, user_id: int):
    return db.query(Moodboards).filter(Moodboards.user_id == user_id).all()

def get_moodboard(db: Session, moodboard_id: int):
    return db.query(Moodboards).filter(Moodboards.id == moodboard_id).first()

def create_moodboard(db: Session, moodboard: MoodboardCreate, user_id: int):
    db_moodboard = Moodboards(
        **moodboard.model_dump(),
        user_id=user_id
    )
    db.add(db_moodboard)
    db.commit()
    db.refresh(db_moodboard)
    return db_moodboard

def update_moodboard(db: Session, db_moodboard: Moodboards, moodboard_update: MoodboardUpdate):
    update_data = moodboard_update.model_dump(exclude_unset=True)
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
def add_image_to_moodboard(db: Session, image: ImageCreate):
    db_image = Image(**image.model_dump())
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

def delete_image(db: Session, image_id: int):
    db_image = db.query(Image).filter(Image.id == image_id).first()
    if db_image:
        db.delete(db_image)
        db.commit()
        return True
    return False

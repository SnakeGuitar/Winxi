from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from winxi.dependencies import get_db, get_current_user
from winxi.users.models import User
import service
import schemas

router = APIRouter(prefix="/moodboards", tags=["moodboards"])

@router.get("/", response_model=List[schemas.MoodboardOut])
def read_moodboards(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.get_moodboards(db, user_id=current_user.id)

@router.post("/", response_model=schemas.MoodboardOut, status_code=status.HTTP_201_CREATED)
def create_moodboard(moodboard: schemas.MoodboardCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.create_moodboard(db, moodboard=moodboard, user_id=current_user.id)

@router.get("/{moodboard_id}", response_model=schemas.MoodboardOut)
def read_moodboard(moodboard_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_moodboard = service.get_moodboard(db, moodboard_id=moodboard_id)
    if db_moodboard is None or db_moodboard.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Moodboard not found")
    return db_moodboard

@router.patch("/{moodboard_id}", response_model=schemas.MoodboardOut)
def update_moodboard(moodboard_id: int, moodboard_update: schemas.MoodboardUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_moodboard = service.get_moodboard(db, moodboard_id=moodboard_id)
    if db_moodboard is None or db_moodboard.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Moodboard not found")
    return service.update_moodboard(db, db_moodboard=db_moodboard, moodboard_update=moodboard_update)

@router.delete("/{moodboard_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_moodboard(moodboard_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_moodboard = service.get_moodboard(db, moodboard_id=moodboard_id)
    if db_moodboard is None or db_moodboard.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Moodboard not found")
    service.delete_moodboard(db, db_moodboard=db_moodboard)
    return None

# Image Endpoints
@router.post("/images", response_model=schemas.ImageOut, status_code=status.HTTP_201_CREATED)
def add_image(image: schemas.ImageCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_moodboard = service.get_moodboard(db, moodboard_id=image.moodboard_id)
    if not db_moodboard or db_moodboard.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Moodboard not found")
    return service.add_image_to_moodboard(db, image=image)

@router.delete("/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(image_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    from .models import Image
    db_image = db.query(Image).filter(Image.id == image_id).first()
    if not db_image or db_image.moodboard.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Image not found")
    
    service.delete_image(db, image_id=image_id)
    return None

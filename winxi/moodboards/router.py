from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from winxi.dependencies import get_db, get_current_user
from winxi.users.models import User
from . import service
from . import schemas

router = APIRouter(prefix="/moodboards", tags=["moodboards"])

@router.get("/", response_model=List[schemas.MoodboardOut])
def read_moodboards(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.get_moodboards(db, user_id=current_user.id)

@router.post("/", response_model=schemas.MoodboardOut, status_code=status.HTTP_201_CREATED)
def create_moodboard(moodboard: schemas.MoodboardCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.create_moodboard(db, moodboard=moodboard, user_id=current_user.id)

@router.get("/{moodboard_id}", response_model=schemas.MoodboardOut)
def read_moodboard(moodboard_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.get_user_moodboard(db, moodboard_id, current_user.id)

@router.patch("/{moodboard_id}", response_model=schemas.MoodboardOut)
def update_moodboard(moodboard_id: int, moodboard_update: schemas.MoodboardUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_moodboard = service.get_user_moodboard(db, moodboard_id, current_user.id)
    return service.update_moodboard(db, db_moodboard=db_moodboard, moodboard_update=moodboard_update)

@router.delete("/{moodboard_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_moodboard(moodboard_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_moodboard = service.get_user_moodboard(db, moodboard_id, current_user.id)
    service.delete_moodboard(db, db_moodboard=db_moodboard)
    return None

# Image Endpoints
@router.post("/images", response_model=schemas.ImageOut, status_code=status.HTTP_201_CREATED)
def add_image(image: schemas.ImageCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    service.get_user_moodboard(db, image.moodboard_id, current_user.id)
    return service.add_image_to_moodboard(db, image=image)

@router.delete("/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(image_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_image = service.get_user_image(db, image_id, current_user.id)
    service.delete_image(db, db_image)
    return None

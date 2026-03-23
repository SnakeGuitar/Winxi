from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status

from winxi.dependencies import get_db, get_current_user
from winxi.users.models import User
import winxi.users.service as service
from winxi.users.schemas import UserCreate, UserUpdate, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = service.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail=f"Username '{user.username}' already registered")
    return service.create_user(db=db, user=user)


@router.get("/me", response_model=UserOut)
def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/{user_id}", response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = service.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.patch("/me", response_model=UserOut)
def update_user_me(user_update: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.update_user(db=db, db_user=current_user, user_update=user_update)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    service.delete_user(db=db, db_user=current_user)
    return None

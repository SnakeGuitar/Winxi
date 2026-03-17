from sqlalchemy.orm import Session
from .models import User
from .schemas import UserCreate, UserUpdate
from winxi.core.security import hash_password
from winxi.users import repository

def get_user(db: Session, user_id: int):
    return repository.get_user(db, user_id)

def get_user_by_username(db: Session, username: str):
    return repository.get_user_by_username(db, username)


def create_user(db: Session, user: UserCreate):
    user_data = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hash_password(user.password)
    }
    return repository.create_user(db, user_data)


def update_user(db: Session, db_user: User, user_update: UserUpdate):
    update_data = user_update.model_dump(exclude_unset=True)
    
    if "password" in update_data:
        update_data["hashed_password"] = hash_password(update_data.pop("password"))
    
    return repository.update_user(db, db_user, update_data)


def delete_user(db: Session, db_user: User):
    return repository.delete_user(db, db_user)
from sqlalchemy.orm import Session
from winxi.auth.models import User
from winxi.users.schemas import UserCreate, UserUpdate
from winxi.users.utils import password_hash

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate):
    db_user = User(username=user.username, hashed_password=password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_email(db: Session, user: UserUpdate):
    user.email = user.email
    db.commit()
    db.refresh(user)
    return user


def update_user_username(db: Session, user: UserUpdate):
    user.username = user.username
    db.commit()


def update_user_password(db: Session, user: UserUpdate):
    user.hashed_password = password_hash(user.password)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()
    return
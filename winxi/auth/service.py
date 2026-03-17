from datetime import timedelta
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from winxi.auth.utils import password_hash, get_expiration_date, get_utc_now
from winxi.users.models import User
from winxi.users.service import get_user_by_username
from winxi.auth.models import Token

import os
import uuid

SECRET_KEY = os.getenv("SECRET_KEY", "DEVELOPMENT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = get_utc_now() + expires_delta
    else:
        expire = get_utc_now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def login_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not password_hash.verify(password, user.hashed_password):
        return None

    # Update login status
    user.is_logged_in = True
    db.commit()
    db.refresh(user)
    return user


def create_refresh_token(db: Session, user_id: int):
    refresh_token = str(uuid.uuid4())

    db_token = Token(
        user_id=user_id,
        refresh_token=refresh_token,
        expires_at=get_expiration_date()
    )
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token


def get_refresh_token(db: Session, token: str):
    return db.query(Token).filter(Token.refresh_token == token, Token.is_revoked == False).first()


def logout_user(db: Session, user: User):
    user.is_logged_in = False
    db.query(Token).filter(Token.user_id == user.id, Token.is_revoked == False).update({"is_revoked": True})
    db.commit()
    return True

from sqlalchemy.orm import Session
from winxi.auth.utils import password_hash, get_expiration_date
from winxi.users.models import User
from winxi.users.service import get_user_by_username
from jose import jwt, JWTError

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = get_expiration_date()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, "SECRET_KEY", algorithm="HS256")

def decode_access_token(token: str):
    try:
        return jwt.decode(token, "SECRET_KEY", algorithms=["HS256"])
    except JWTError:
        return None

def login_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if user and password_hash.verify(password, user.hashed_password) and user.is_logged_in == False:
        user.is_logged_in = True
        return user
    return None

def logout_user(db: Session, user: User):
    user.is_logged_in = False
    db.commit()
    db.refresh(user)
    return user.is_logged_in
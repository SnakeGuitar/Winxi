import os
from datetime import datetime, timedelta, timezone
from typing import Any, Union
from jose import jwt
from pwdlib import PasswordHash

# Security Constants
SECRET_KEY = os.getenv("SECRET_KEY", "DEVELOPMENT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

# Password Hashing
password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


# JWT Operations
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = get_utc_now() + expires_delta
    else:
        expire = get_utc_now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> Union[dict, None]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None


# Datetime Utilities
def get_utc_now() -> datetime:
    return datetime.now(timezone.utc)


def get_refresh_token_expiration() -> datetime:
    return get_utc_now() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

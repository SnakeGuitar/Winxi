from sqlalchemy.orm import Session
import uuid
from winxi.core.security import (
    hash_password, verify_password, create_access_token, get_utc_now, get_refresh_token_expiration
)
from winxi.auth import repository as auth_repo
from winxi.users import repository as users_repo


def generate_access_token(user_id: int) -> str:
    """Generate a new access token for the user."""
    return create_access_token(data={"user_id": user_id})


def login_user(db: Session, username: str, password: str):
    user = users_repo.get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None

    users_repo.update_user(db, user, {"is_logged_in": True})
    return user


def create_refresh_token(db: Session, user_id: int):
    refresh_token = str(uuid.uuid4())

    token_data = {
        "user_id": user_id,
        "refresh_token": refresh_token,
        "expires_at": get_refresh_token_expiration()
    }
    return auth_repo.create_token(db, token_data)


def get_refresh_token(db: Session, token: str):
    return auth_repo.get_valid_refresh_token(db, token)


def logout_user(db: Session, user):
    users_repo.update_user(db, user, {"is_logged_in": False})
    auth_repo.revoke_all_user_tokens(db, user.id)
    return True

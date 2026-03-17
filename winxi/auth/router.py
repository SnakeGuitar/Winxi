from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from winxi.dependencies import get_db, get_current_user
from . import service, schemas
from winxi.users.models import User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=schemas.TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = service.login_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = service.create_access_token(data={"user_id": user.id})
    refresh_token_db = service.create_refresh_token(db, user_id=user.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token_db.refresh_token
    }


@router.post("/refresh", response_model=schemas.AccessToken)
def refresh_token(payload: schemas.TokenRefreshRequest, db: Session = Depends(get_db)):
    db_token = service.get_refresh_token(db, payload.refresh_token)
    if not db_token or not db_token.is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    new_access_token = service.create_access_token(data={"user_id": db_token.user_id})
    return {"access_token": new_access_token, "token_type": "bearer"}


@router.post("/logout")
def logout(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    service.logout_user(db, current_user)
    return {"message": "Successfully logged out"}

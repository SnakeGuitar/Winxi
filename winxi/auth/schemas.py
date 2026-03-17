from pydantic import BaseModel, ConfigDict
from datetime import datetime


class TokenOut(BaseModel):
    refresh_token: str
    created_at: datetime
    expires_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AccessToken(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenResponse(AccessToken):
    refresh_token: str


class TokenRefreshRequest(BaseModel):
    refresh_token: str


class TokenPayload(BaseModel):
    user_id: int
    exp: datetime
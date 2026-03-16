from pydantic import BaseModel
from datetime import datetime
from typing import Optional

from pydantic.v1 import EmailStr, ConfigDict


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool

    model_config = ConfigDict(from_attributes=True)

class TokenOut(BaseModel):
    refresh_token: str
    created_at: datetime
    expires_at: datetime

    model_config = ConfigDict(from_attributes=True)
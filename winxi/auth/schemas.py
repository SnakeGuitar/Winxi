from pydantic import BaseModel
from datetime import datetime

from pydantic.v1 import ConfigDict

class TokenOut(BaseModel):
    refresh_token: str
    created_at: datetime
    expires_at: datetime

    model_config = ConfigDict(from_attributes=True)
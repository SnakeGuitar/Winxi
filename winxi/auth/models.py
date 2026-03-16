import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from winxi.database import Base
from datetime import datetime, timedelta, timezone

def get_utc_now():
    return datetime.now(timezone.utc)

def get_expiration_date():
    return datetime.now(timezone.utc) + timedelta(days=7)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True,index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    is_active = Column(Boolean, default=False)

class Token(Base):
    __tablename__ = "tokens"
    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    refresh_token = Column(String(500),unique=True,index=True, nullable=False)
    created_at = Column(DateTime, default=get_utc_now(), nullable=False)
    expires_at = Column(DateTime, default=get_expiration_date(), nullable=False)
    is_revoked = Column(Boolean, default=False, index=True)

    user = relationship("User", backref="tokens")

    @property
    def is_valid(self):
        if self.is_revoked:
            return False
        return get_utc_now() < self.expires_at
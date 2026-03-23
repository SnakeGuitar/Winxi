from sqlalchemy import Column, Integer, String, Boolean

from winxi.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True,index=True)
    username = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True)
    is_logged_in = Column(Boolean, default=False)
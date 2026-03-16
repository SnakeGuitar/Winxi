from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from winxi.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(255),index=True)
    email = Column(String(255), unique=True, index=True)
    is_active = Column(Boolean,default=False)

class Image(Base):
    __tablename__ = "images"
    id = Column(Integer,primary_key=True,index=True)
    moodboard_id = Column(Integer, ForeignKey("moodboards.id"))
    url = Column(String(255),index=True)

class Moodboards(Base):
    __tablename__ = "moodboards"
    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255),index=True)
    description = Column(String(255),index=True)
    cover_image = Column(String(255),index=True)
    created_at = Column(String(255))

    user = relationship("User", backref="moodboards")
    images = relationship("Image", back_populates="moodboard")
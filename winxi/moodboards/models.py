from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from winxi.database import Base
from winxi.moodboards.utils import get_utc_now

class Image(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True, index=True)
    moodboard_id = Column(Integer, ForeignKey("moodboards.id"))
    url = Column(String(255), index=True)

    moodboard = relationship("Moodboards", back_populates="images")


class Moodboards(Base):
    __tablename__ = "moodboards"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), index=True)
    description = Column(String(255), index=True)
    cover_image = Column(String(255), index=True)
    created_at = Column(DateTime, default=get_utc_now(), nullable=False)

    user = relationship("User", backref="moodboards")
    images = relationship("Image", back_populates="moodboard", cascade="all, delete-orphan")

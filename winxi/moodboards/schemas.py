from pydantic import BaseModel, ConfigDict, HttpUrl
from typing import List, Optional
from datetime import datetime

# Image Schemas
class ImageBase(BaseModel):
    url: str

class ImageCreate(ImageBase):
    moodboard_id: int

class ImageOut(ImageBase):
    id: int
    moodboard_id: int

    model_config = ConfigDict(from_attributes=True)

# Moodboard Schemas
class MoodboardBase(BaseModel):
    title: str
    description: Optional[str] = None
    cover_image: Optional[str] = None

class MoodboardCreate(MoodboardBase):
    pass

class MoodboardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None

class MoodboardOut(MoodboardBase):
    id: int
    user_id: int
    created_at: datetime
    images: List[ImageOut] = []

    model_config = ConfigDict(from_attributes=True)

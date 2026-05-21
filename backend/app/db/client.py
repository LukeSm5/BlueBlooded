from sqlalchemy import (
    Column, Integer, Text, ForeignKey, Float, DateTime, Boolean, CheckConstraint,
    UniqueConstraint, Index,
)
from datetime import datetime, timezone

class User():
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(Text, unique=True, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
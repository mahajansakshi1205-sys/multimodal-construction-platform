import json
from datetime import datetime, timezone
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class InspectionAudit(Base):
    __tablename__ = "inspection_audits"

    id = Column(Integer, primary_key=True, index=True)
    module_type = Column(String(50), index=True)  # "safety", "crack", "valuation", "planning", "advisory"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    title = Column(String(200), default="Inspection Record")
    image_path = Column(String(300), nullable=True)
    summary = Column(Text, nullable=True)
    data_json = Column(Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "module_type": self.module_type,
            "created_at": self.created_at.isoformat(),
            "title": self.title,
            "image_path": self.image_path,
            "summary": self.summary,
            "data": json.loads(self.data_json) if self.data_json else {}
        }

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

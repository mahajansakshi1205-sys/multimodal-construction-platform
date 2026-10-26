from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.models.database import get_db, InspectionAudit
from app.core.ai_service import ai_service
from app.core.config import settings

router = APIRouter(prefix="/reports", tags=["Reports & History"])

class ConfigUpdateRequest(BaseModel):
    api_key: str

@router.get("/")
def get_recent_reports(module: str = None, limit: int = 50, db: Session = Depends(get_db)):
    query = db.query(InspectionAudit)
    if module:
        query = query.filter(InspectionAudit.module_type == module)
    records = query.order_by(InspectionAudit.created_at.desc()).limit(limit).all()
    return [r.to_dict() for r in records]

@router.get("/{report_id}")
def get_report_detail(report_id: int, db: Session = Depends(get_db)):
    record = db.query(InspectionAudit).filter(InspectionAudit.id == report_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Report not found")
    return record.to_dict()

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    record = db.query(InspectionAudit).filter(InspectionAudit.id == report_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Report not found")
    db.delete(record)
    db.commit()
    return {"status": "success", "message": f"Report #{report_id} deleted."}

@router.post("/config/api-key")
def update_api_key(payload: ConfigUpdateRequest):
    ai_service.set_api_key(payload.api_key)
    return {
        "status": "success",
        "configured": ai_service.is_configured(),
        "message": "Gemini API key updated successfully."
    }

@router.get("/config/status")
def get_config_status():
    return {
        "gemini_configured": ai_service.is_configured(),
        "model": settings.GEMINI_MODEL,
        "database": "SQLite Connected",
        "system_status": "Operational"
    }

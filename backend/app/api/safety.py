import os
import uuid
import json
from datetime import datetime, timezone
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.schemas import SafetyAnalysisResponse
from app.models.database import get_db, InspectionAudit
from app.core.ai_service import ai_service

router = APIRouter(prefix="/safety", tags=["Safety Monitoring"])

@router.post("/analyze", response_model=SafetyAnalysisResponse)
async def analyze_site_safety(
    file: UploadFile = File(...),
    notes: str = Form(default=""),
    db: Session = Depends(get_db)
):
    try:
        # Save uploaded image
        file_ext = os.path.splitext(file.filename)[1] or ".jpg"
        unique_name = f"safety_{uuid.uuid4().hex[:8]}{file_ext}"
        file_path = os.path.join(settings.UPLOAD_DIR, unique_name)
        
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        # AI analysis
        result = ai_service.analyze_site_safety(file_path, notes)
        report_id = f"SAF-{uuid.uuid4().hex[:6].upper()}"
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        result["id"] = report_id
        result["timestamp"] = timestamp
        result["image_url"] = f"/uploads/{unique_name}"

        # Persist to database
        audit = InspectionAudit(
            module_type="safety",
            title=f"Safety Audit: {result['risk_level']} Risk ({result['overall_compliance_score']}%)",
            image_path=result["image_url"],
            summary=result["compliance_summary"],
            data_json=json.dumps(result)
        )
        db.add(audit)
        db.commit()

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Safety inspection failed: {str(e)}")

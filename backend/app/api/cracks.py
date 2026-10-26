import os
import uuid
import json
from datetime import datetime, timezone
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.schemas import CrackAnalysisResponse
from app.models.database import get_db, InspectionAudit
from app.core.ai_service import ai_service

router = APIRouter(prefix="/cracks", tags=["Structural Crack Analysis"])

@router.post("/analyze", response_model=CrackAnalysisResponse)
async def analyze_structural_crack(
    file: UploadFile = File(...),
    structural_context: str = Form(default=""),
    db: Session = Depends(get_db)
):
    try:
        file_ext = os.path.splitext(file.filename)[1] or ".jpg"
        unique_name = f"crack_{uuid.uuid4().hex[:8]}{file_ext}"
        file_path = os.path.join(settings.UPLOAD_DIR, unique_name)

        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        result = ai_service.analyze_structural_crack(file_path, structural_context)
        report_id = f"CRK-{uuid.uuid4().hex[:6].upper()}"
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        result["id"] = report_id
        result["timestamp"] = timestamp
        result["image_url"] = f"/uploads/{unique_name}"

        audit = InspectionAudit(
            module_type="crack",
            title=f"Crack Assessment: {result['crack_type']} ({result['severity']})",
            image_path=result["image_url"],
            summary=result["structural_integrity_risk"],
            data_json=json.dumps(result)
        )
        db.add(audit)
        db.commit()

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Crack analysis failed: {str(e)}")

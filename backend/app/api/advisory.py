import uuid
import json
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import AdvisoryRequest, AdvisoryResponse
from app.models.database import get_db, InspectionAudit
from app.core.ai_service import ai_service

router = APIRouter(prefix="/advisory", tags=["Daily Site Advisory"])

@router.post("/evaluate", response_model=AdvisoryResponse)
def evaluate_site_advisory(
    payload: AdvisoryRequest,
    db: Session = Depends(get_db)
):
    try:
        data = payload.model_dump()
        result = ai_service.evaluate_daily_weather_advisory(data)
        log_id = f"ADV-{uuid.uuid4().hex[:6].upper()}"
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        result["id"] = log_id
        result["timestamp"] = timestamp

        audit = InspectionAudit(
            module_type="advisory",
            title=f"Site Advisory: {payload.site_location} ({payload.weather_condition}, {payload.current_temperature_c}°C)",
            image_path=None,
            summary=result["overall_site_condition"],
            data_json=json.dumps(result)
        )
        db.add(audit)
        db.commit()

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Advisory generation failed: {str(e)}")

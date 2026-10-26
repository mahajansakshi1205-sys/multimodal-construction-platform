import uuid
import json
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import ProjectPlanningRequest, ProjectPlanningResponse
from app.models.database import get_db, InspectionAudit
from app.core.ai_service import ai_service

router = APIRouter(prefix="/planning", tags=["Construction Project Planning"])

@router.post("/generate", response_model=ProjectPlanningResponse)
def generate_project_plan(
    payload: ProjectPlanningRequest,
    db: Session = Depends(get_db)
):
    try:
        data = payload.model_dump()
        result = ai_service.generate_project_plan(data)
        plan_id = f"PLN-{uuid.uuid4().hex[:6].upper()}"
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        result["id"] = plan_id
        result["timestamp"] = timestamp
        result["project_name"] = payload.project_name

        audit = InspectionAudit(
            module_type="planning",
            title=f"WBS Schedule: {payload.project_name} ({payload.building_type})",
            image_path=None,
            summary=f"Duration: {result['total_estimated_duration_weeks']} weeks, Cost: ${result['total_estimated_cost_usd']:,.2f}",
            data_json=json.dumps(result)
        )
        db.add(audit)
        db.commit()

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Project planning failed: {str(e)}")

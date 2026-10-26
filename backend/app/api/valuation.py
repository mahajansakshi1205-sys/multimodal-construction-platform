import os
import uuid
import json
from datetime import datetime, timezone
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.schemas import ValuationResponse, ValuationRequest
from app.models.database import get_db, InspectionAudit
from app.core.ai_service import ai_service

router = APIRouter(prefix="/valuation", tags=["Real Estate Valuation"])

@router.post("/estimate", response_model=ValuationResponse)
async def estimate_valuation(
    property_type: str = Form(...),
    built_up_area_sqft: float = Form(...),
    location_tier: str = Form(...),
    construction_quality: str = Form(...),
    age_of_structure_years: float = Form(...),
    zoning: str = Form("Residential R-2"),
    amenities: str = Form("[]"),  # JSON string list
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        image_url = None
        file_path = None
        if file and file.filename:
            file_ext = os.path.splitext(file.filename)[1] or ".jpg"
            unique_name = f"property_{uuid.uuid4().hex[:8]}{file_ext}"
            file_path = os.path.join(settings.UPLOAD_DIR, unique_name)
            contents = await file.read()
            with open(file_path, "wb") as f:
                f.write(contents)
            image_url = f"/uploads/{unique_name}"

        amenities_list = []
        try:
            amenities_list = json.loads(amenities)
        except Exception:
            if amenities:
                amenities_list = [a.strip() for a in amenities.split(",")]

        input_data = {
            "property_type": property_type,
            "built_up_area_sqft": built_up_area_sqft,
            "location_tier": location_tier,
            "construction_quality": construction_quality,
            "age_of_structure_years": age_of_structure_years,
            "zoning": zoning,
            "amenities": amenities_list
        }

        result = ai_service.estimate_real_estate_valuation(input_data, file_path)
        report_id = f"VAL-{uuid.uuid4().hex[:6].upper()}"
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

        result["id"] = report_id
        result["timestamp"] = timestamp
        result["image_url"] = image_url

        audit = InspectionAudit(
            module_type="valuation",
            title=f"Valuation: ${result['estimated_market_value']:,.2f} ({property_type})",
            image_path=image_url,
            summary=result["market_outlook"],
            data_json=json.dumps(result)
        )
        db.add(audit)
        db.commit()

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Valuation estimation failed: {str(e)}")

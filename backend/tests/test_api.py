import os
import io
from PIL import Image
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def create_test_image_bytes():
    img = Image.new("RGB", (200, 200), color=(100, 150, 200))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    return buf

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_safety_inspection_endpoint():
    img_buf = create_test_image_bytes()
    response = client.post(
        "/api/safety/analyze",
        files={"file": ("site.jpg", img_buf, "image/jpeg")},
        data={"notes": "Ground floor corridor check"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "overall_compliance_score" in data
    assert "ppe_checklist" in data
    assert "hazards_detected" in data
    assert len(data["ppe_checklist"]) > 0

def test_crack_analysis_endpoint():
    img_buf = create_test_image_bytes()
    response = client.post(
        "/api/cracks/analyze",
        files={"file": ("concrete_crack.jpg", img_buf, "image/jpeg")},
        data={"structural_context": "Basement retaining wall"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "crack_type" in data
    assert "severity_score" in data
    assert "recommended_repair_method" in data

def test_real_estate_valuation_endpoint():
    response = client.post(
        "/api/valuation/estimate",
        data={
            "property_type": "Commercial",
            "built_up_area_sqft": 4500.0,
            "location_tier": "Tier 1 - Prime Metro",
            "construction_quality": "Luxury",
            "age_of_structure_years": 1.5,
            "zoning": "C-3 Commercial",
            "amenities": '["Underground Parking", "LEED Gold Certified", "High-speed Elevators"]'
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["estimated_market_value"] > 0
    assert "price_per_sqft_range" in data

def test_project_planning_endpoint():
    payload = {
        "project_name": "Horizon Heights Tower",
        "building_type": "High-Rise Residential",
        "total_budget_usd": 2500000.0,
        "target_duration_months": 18,
        "site_area_sqft": 15000.0,
        "special_requirements": "Deep pile foundations required"
    }
    response = client.post("/api/planning/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["phases"]) > 0
    assert "critical_path_summary" in data

def test_daily_advisory_endpoint():
    payload = {
        "site_location": "Sector 42 Bridge Span",
        "current_temperature_c": 28.5,
        "weather_condition": "High Winds",
        "wind_speed_kmh": 42.0,
        "humidity_pct": 60.0,
        "scheduled_activities": ["Crane Operations", "Concrete Pouring"]
    }
    response = client.post("/api/advisory/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "activity_impacts" in data
    # Crane should be prohibited due to 42 km/h wind
    crane_impact = next(i for i in data["activity_impacts"] if i["activity"] == "Crane Operations")
    assert crane_impact["safe_to_proceed"] is False

def test_knowledge_chat_endpoint():
    payload = {
        "query": "What is the minimum curing time for concrete before removing formwork?",
        "category": "Structural"
    }
    response = client.post("/api/knowledge/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert len(data["referenced_standards"]) > 0

def test_reports_history():
    response = client.get("/api/reports/")
    assert response.status_code == 200
    records = response.json()
    assert isinstance(records, list)
    assert len(records) > 0

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Safety Monitoring Contracts ---
class PPEItem(BaseModel):
    item: str
    detected: bool
    status: str  # "Compliant" | "Non-Compliant" | "Missing"
    confidence: float
    notes: Optional[str] = None

class SafetyHazard(BaseModel):
    hazard_type: str
    severity: str  # "Low" | "Medium" | "High" | "Critical"
    location: str
    description: str
    recommended_action: str

class SafetyAnalysisResponse(BaseModel):
    id: Optional[str] = None
    timestamp: str
    image_url: Optional[str] = None
    overall_compliance_score: int  # 0 to 100
    risk_level: str  # "Low" | "Moderate" | "High" | "Severe"
    total_workers_detected: int
    ppe_checklist: List[PPEItem]
    hazards_detected: List[SafetyHazard]
    toolbox_recommendations: List[str]
    compliance_summary: str

# --- Crack Detection & Analysis Contracts ---
class CrackAnalysisResponse(BaseModel):
    id: Optional[str] = None
    timestamp: str
    image_url: Optional[str] = None
    crack_type: str  # "Structural Shear Crack" | "Hairline Surface Crack" | "Settlement Crack" | "Shrinkage Crack" | "Thermal Expansion Crack"
    severity: str    # "Minor" | "Moderate" | "Severe" | "Critical"
    severity_score: int  # 0 - 100
    estimated_width_mm: float
    structural_integrity_risk: str
    probable_causes: List[str]
    immediate_actions: List[str]
    recommended_repair_method: str
    materials_required: List[str]
    engineer_inspection_required: bool

# --- Real Estate Valuation Contracts ---
class ValuationRequest(BaseModel):
    property_type: str  # "Commercial" | "Residential" | "Industrial" | "Mixed-Use"
    built_up_area_sqft: float
    location_tier: str  # "Tier 1 - Prime Metro" | "Tier 2 - Urban" | "Tier 3 - Suburban"
    construction_quality: str  # "Luxury" | "Standard" | "Economy"
    age_of_structure_years: float
    zoning: str
    amenities: List[str] = []
    current_occupancy_rate: Optional[float] = 100.0

class ValuationResponse(BaseModel):
    id: Optional[str] = None
    timestamp: str
    image_url: Optional[str] = None
    estimated_market_value: float
    price_per_sqft_range: Dict[str, float]  # {"min": ..., "avg": ..., "max": ...}
    confidence_score: int  # 0 - 100
    valuation_breakdown: Dict[str, float]   # Land value, replacement cost, depreciation, location premium
    key_value_drivers: List[str]
    risk_factors: List[str]
    estimated_annual_roi_pct: float
    market_outlook: str

# --- Construction Project Planning Contracts ---
class ProjectPlanningRequest(BaseModel):
    project_name: str
    building_type: str  # "High-Rise Residential" | "Commercial Office" | "Warehouse" | "Bridge/Infrastructure"
    total_budget_usd: float
    target_duration_months: int
    site_area_sqft: float
    special_requirements: Optional[str] = None

class WBSPhase(BaseModel):
    phase_id: str
    phase_name: str
    duration_weeks: int
    estimated_cost_usd: float
    tasks: List[str]
    dependencies: List[str]
    critical_path: bool

class ProjectPlanningResponse(BaseModel):
    id: Optional[str] = None
    timestamp: str
    project_name: str
    total_estimated_duration_weeks: int
    total_estimated_cost_usd: float
    contingency_budget_usd: float
    phases: List[WBSPhase]
    key_milestones: List[Dict[str, str]]
    critical_path_summary: List[str]
    top_project_risks: List[Dict[str, str]]
    recommended_crew_size: int

# --- Daily Site Assistance & Weather Advisory Contracts ---
class AdvisoryRequest(BaseModel):
    site_location: str
    current_temperature_c: float
    weather_condition: str  # "Sunny" | "Rain / Downpour" | "High Winds" | "Freezing / Snow" | "Extreme Heat"
    wind_speed_kmh: float
    humidity_pct: float
    scheduled_activities: List[str] = []  # e.g., ["Concrete Pouring", "Crane Operations", "Roofing", "Exterior Painting"]

class ActivityImpact(BaseModel):
    activity: str
    safe_to_proceed: bool
    risk_level: str  # "Low" | "Caution" | "Prohibited / Dangerous"
    advisory_notes: str

class AdvisoryResponse(BaseModel):
    id: Optional[str] = None
    timestamp: str
    site_location: str
    overall_site_condition: str
    activity_impacts: List[ActivityImpact]
    weather_risk_alerts: List[str]
    daily_site_log: Dict[str, Any]
    toolbox_talk_of_the_day: Dict[str, str]  # {"topic": ..., "key_points": ...}

# --- Knowledge Assistant Contracts ---
class ChatMessage(BaseModel):
    role: str  # "user" | "assistant" | "system"
    content: str

class ChatRequest(BaseModel):
    query: str
    category: Optional[str] = "General"  # "OSHA Safety" | "Building Codes" | "Materials" | "Structural"
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str
    referenced_standards: List[str]
    recommended_followups: List[str]

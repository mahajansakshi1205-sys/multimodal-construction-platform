from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.core.ai_service import ai_service

router = APIRouter(prefix="/knowledge", tags=["Construction Knowledge Assistant"])

@router.post("/chat", response_model=ChatResponse)
def chat_with_expert(payload: ChatRequest):
    result = ai_service.chat_knowledge_assistant(payload.query, payload.category or "General")
    return result

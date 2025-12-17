from fastapi import APIRouter
from pydantic import BaseModel
from rag.pipeline import rag_answer

router = APIRouter()

class Query(BaseModel):
    message: str

@router.post("/ask")
def ask_bot(q: Query):
    answer = rag_answer(q.message)
    return {"answer": answer}

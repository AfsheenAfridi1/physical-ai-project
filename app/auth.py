from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: User):
    return {
        "message": "Signup successful",
        "user": user.email
    }

@router.post("/login")
def login(user: User):
    return {
        "message": "Login successful",
        "token": "demo-token-123"
    }

import os, jwt, datetime
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = "BETTERAUTH_SUPER_SECRET"
ALGO = "HS256"

app = FastAPI(title="Physical AI BetterAuth Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
)

security = HTTPBearer()

@app.get("/")
def home():
    return {"message": "Backend OK 🚀"}

USERS_DB = {}

class Signup(BaseModel):
    username: str
    background: str

class Login(BaseModel):
    username: str

class Question(BaseModel):
    message: str    

class Chat(BaseModel):
    message: str

def create_token(username: str):
    payload = {
        "sub": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGO)

def verify_token(cred: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = cred.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGO])
        return payload["sub"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/auth/signup")
def signup(data: Signup):
    if data.username in USERS_DB:
        raise HTTPException(status_code=400, detail="User already exists")
    USERS_DB[data.username] = {"background": data.background}
    return {"token": create_token(data.username)}

@app.post("/auth/login")
def login(data: Login):
    if data.username not in USERS_DB:
        raise HTTPException(status_code=404, detail="User not found")
    return {"token": create_token(data.username)}

@app.get("/auth/profile")
def profile(user=Depends(verify_token)):
    return {
        "username": user,
        "background": USERS_DB[user]["background"],
    }

@app.post("/ask")
def ask(q: Question, user=Depends(verify_token)):
    bg = USERS_DB[user]["background"]
    return {
        "answer": f"Hello {user} 👋\nYour background: {bg}"
    }

@app.post("/chat")
def chat(data: Chat):
    return {"reply": f"You said: {data.message} 🤖"}

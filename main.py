# main.py
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
from qdrant_client import QdrantClient

load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION = os.getenv("COLLECTION_NAME", "book")

if not GEMINI_KEY:
    raise SystemExit("GEMINI_API_KEY missing in .env")

# configure
genai.configure(api_key=GEMINI_KEY)
qclient = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

app = FastAPI(title="Book RAG Backend")

# allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://127.0.0.1:3000","http://localhost:3001","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    message: str

@app.get("/health")
def health():
    return {"message": "Backend is running"}

@app.post("/ask")
def ask(q: Question):
    try:
        # 1) embed the query
        emb_resp = genai.embed_content(model="text-embedding-3-large", content=q.message)
        query_vector = emb_resp.get("embedding") if isinstance(emb_resp, dict) else emb_resp["embedding"]

        # 2) search qdrant
        hits = qclient.search(collection_name=COLLECTION, query_vector=query_vector, limit=3, with_payload=True)

        # gather context text
        context_parts = []
        for h in hits:
            payload = h.payload or {}
            text = payload.get("text") or payload.get("file") or ""
            context_parts.append(text)

        # 3) build prompt for Gemini
        prompt = (
            "You are an assistant that answers user questions using the provided book fragments. "
            "Only answer based on the book content. If the answer is not found, say 'I don't know'.\n\n"
            "Context:\n" + "\n\n---\n\n".join(context_parts) + "\n\n"
            "User question:\n" + q.message + "\n\nAnswer:"
        )

        # 4) call Gemini
        model = genai.GenerativeModel("gemini-1.5-flash")
        resp = model.generate_content(prompt)
        # response.text usually holds output; fallback to str(resp)
        answer = resp.text if hasattr(resp, "text") else str(resp)

        return {"answer": answer}

    except Exception as e:
        print("Error in /ask:", e)
        return {"answer": "Server error. Gemini reply nahi de saka."}

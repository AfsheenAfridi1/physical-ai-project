import os
from dotenv import load_dotenv
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.http import models
import docx
import PyPDF2

load_dotenv()

# Load API Keys
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_API = os.getenv("QDRANT_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")

genai.configure(api_key=GEMINI_KEY)

# -------------------------------
# Qdrant Setup
# -------------------------------
client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API
)

COLLECTION = "book"

# Create collection if missing
try:
    client.get_collection(COLLECTION)
except:
    client.create_collection(
        COLLECTION,
        vectors_config=models.VectorParams(
            size=768,
            distance=models.Distance.COSINE
        )
    )


# -------------------------------
# Embedding Function
# -------------------------------
def get_embedding(text):
    model = genai.GenerativeModel("text-embedding-004")
    return model.embed_content(text)["embedding"]


# -------------------------------
# Read TXT file
# -------------------------------
def read_txt(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


# -------------------------------
# Read PDF file
# -------------------------------
def read_pdf(path):
    reader = PyPDF2.PdfReader(path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text


# -------------------------------
# Read DOCX file
# -------------------------------
def read_docx(path):
    doc = docx.Document(path)
    return "\n".join([p.text for p in doc.paragraphs])


# -------------------------------
# Chunking Logic
# -------------------------------
def chunk_text(text, max_length=500):
    words = text.split()
    chunks = []
    current = []

    for w in words:
        current.append(w)
        if len(current) >= max_length:
            chunks.append(" ".join(current))
            current = []

    if current:
        chunks.append(" ".join(current))

    return chunks


# -------------------------------
# Upload File to Qdrant
# -------------------------------
def upload_file(file_path):
    print(f"📂 Loading file: {file_path}")

    # Detect extension
    if file_path.endswith(".txt") or file_path.endswith(".md"):
        text = read_txt(file_path)

    elif file_path.endswith(".pdf"):
        text = read_pdf(file_path)

    elif file_path.endswith(".docx"):
        text = read_docx(file_path)

    else:
        print("❌ Unsupported format!")
        return

    print("📑 Splitting into chunks...")
    chunks = chunk_text(text)

    points = []
    for idx, chunk in enumerate(chunks):
        embedding = get_embedding(chunk)

        points.append(
            models.PointStruct(
                id=idx,
                vector=embedding,
                payload={"text": chunk}
            )
        )

    print("⬆ Uploading to Qdrant Cloud...")
    client.upsert(
        collection_name=COLLECTION,
        points=points
    )

    print("✅ Upload complete! Embeddings stored successfully.")


# -------------------------------
# RUN
# -------------------------------
if __name__ == "__main__":
    print("🚀 Qdrant File Uploader Ready!")
    print("-----------------------------------")

    file_name = input("Enter file name to upload (e.g., book.txt): ")

    file_path = os.path.join(os.getcwd(), file_name)

    if not os.path.exists(file_path):
        print("❌ File not found!")
    else:
        upload_file(file_path)


import os
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

COLLECTION = os.getenv("COLLECTION_NAME", "book")

# create collection
try:
    qdrant.create_collection(
        collection_name=COLLECTION,
        vectors_config=VectorParams(size=768, distance=Distance.COSINE)
    )
except:
    pass

docs = {
    "intro": "Physical AI means AI inside physical bodies like robots.",
    "ros": "ROS 2 is a middleware for robotics applications.",
    "ai": "Reinforcement learning allows robots to learn by reward."
}

points = []

for i, (k, text) in enumerate(docs.items()):
    emb = genai.embed_content(
        model="models/embedding-001",
        content=text
    )["embedding"]

    points.append(
        PointStruct(
            id=i,
            vector=emb,
            payload={"text": text}
        )
    )

qdrant.upsert(collection_name=COLLECTION, points=points)
print("✅ Book data ingested into Qdrant")

import { NextResponse } from "next/server";
import { GoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@google/generative-ai";
import { QdrantClient } from "@qdrant/js-client-rest";

export async function POST(req) {
  try {
    const body = await req.json();
    const question = body.message;

    // ENV variables
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    const QDRANT_URL = process.env.QDRANT_URL;
    const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
    const COLLECTION = process.env.COLLECTION_NAME || "book";

    if (!GEMINI_KEY) {
      return NextResponse.json({ answer: "GEMINI_API_KEY missing" });
    }

    // 1) Embed Query
    const embeddingModel = new GoogleGenerativeAIEmbeddings({
      apiKey: GEMINI_KEY,
      model: "text-embedding-004",
    });

    const embedding = await embeddingModel.embedText(question);

    // 2) Qdrant Search
    const qdrant = new QdrantClient({
      url: QDRANT_URL,
      apiKey: QDRANT_API_KEY,
    });

    const search = await qdrant.search(COLLECTION, {
      vector: embedding,
      limit: 3,
      with_payload: true,
    });

    const contextParts = search.map(
      (hit) => hit.payload?.text || hit.payload?.file || ""
    );

    // 3) Build Prompt
    const prompt = `
You are an assistant that answers user questions using the provided book fragments.
Only answer based on the book content.  
If the answer is not found, say 'I don't know'.

Context:
${contextParts.join("\n\n---\n\n")}

Question:
${question}

Answer:
    `;

    // 4) Gemini Completion
    const genModel = new GoogleGenerativeAI({
      apiKey: GEMINI_KEY,
    });

    const model = genModel.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);

    const answer = response.response.text() || "No reply";

    return NextResponse.json({ answer });
  } catch (err) {
    console.log("API Error:", err);
    return NextResponse.json({
      answer: "Server error. Gemini reply nahi de saka.",
    });
  }
}

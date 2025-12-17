---
title: Architecture
---

The system consists of:

- Frontend: Docusaurus (Book UI)
- Backend: FastAPI
- AI Layer: RAG-based question answering
- Vector Store: Document embeddings
- Auth Layer: JWT (planned)

This design allows scalable and safe AI responses.


## Deployment Plan

- Frontend deployed on Vercel
- Backend deployed on Render
- Environment variables secured
- HTTPS enabled

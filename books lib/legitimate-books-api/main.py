"""
Legitimate Free Books API
A comprehensive API service aggregating legal free book sources including:
- Open Library (Internet Archive)
- Project Gutenberg
- Google Books API
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional, List
import logging

from routers import openlibrary, gutenberg, googlebooks, search
from models import APIInfo

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Legitimate Free Books API",
    description="""
    A comprehensive (unofficial) API service providing free access to legal book sources:
    
    **Sources:**
    - 📚 Open Library (Internet Archive) - Millions of books with lending
    - 📖 Project Gutenberg - 70,000+ public domain books
    - 🔍 Google Books - Metadata and previews
    
    **Features:**
    - Search across multiple sources
    - Get book metadata and details
    - Download links for public domain books
    - Cover images and previews
    - Author information
    
    All sources are legal and respect copyright.
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(openlibrary.router, prefix="/api/v1/openlibrary", tags=["Open Library"])
app.include_router(gutenberg.router, prefix="/api/v1/gutenberg", tags=["Project Gutenberg"])
app.include_router(googlebooks.router, prefix="/api/v1/googlebooks", tags=["Google Books"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Multi-Source Search"])


@app.get("/", response_model=APIInfo)
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Legitimate Free Books API",
        "version": "1.0.0",
        "description": "API for legal free book sources",
        "sources": [
            {
                "name": "Open Library",
                "url": "https://openlibrary.org",
                "books": "Millions",
                "endpoint": "/api/v1/openlibrary"
            },
            {
                "name": "Project Gutenberg",
                "url": "https://www.gutenberg.org",
                "books": "70,000+",
                "endpoint": "/api/v1/gutenberg"
            },
            {
                "name": "Google Books",
                "url": "https://books.google.com",
                "books": "Millions (metadata)",
                "endpoint": "/api/v1/googlebooks"
            }
        ],
        "endpoints": {
            "docs": "/docs",
            "search": "/api/v1/search",
            "health": "/health"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Legitimate Free Books API",
        "version": "1.0.0"
    }


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

"""
Project Gutenberg API Router
Provides access to 70,000+ public domain books
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
import httpx
import logging
from bs4 import BeautifulSoup
import re

from models import GutenbergBook, SearchResult, DownloadFormat, BookCover

logger = logging.getLogger(__name__)
router = APIRouter()

GUTENBERG_API = "https://gutendex.com"
GUTENBERG_MIRRORS = [
    "https://www.gutenberg.org/ebooks",
    "https://www.gutenberg.org/cache/epub"
]


async def fetch_gutendex(endpoint: str, params: dict = None) -> dict:
    """Fetch data from Gutendex API (Gutenberg metadata API)"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(f"{GUTENBERG_API}{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        logger.error(f"Error fetching from Gutendex: {e}")
        raise HTTPException(status_code=503, detail="Gutenberg API unavailable")


def parse_gutenberg_book(book_data: dict) -> GutenbergBook:
    """Parse Gutendex book data into our model"""
    
    # Extract authors
    authors = [author["name"] for author in book_data.get("authors", [])]
    
    # Extract formats/download links
    formats = []
    for format_type, url in book_data.get("formats", {}).items():
        if any(ext in format_type.lower() for ext in ["epub", "pdf", "txt", "html", "mobi"]):
            format_name = format_type.split(";")[0].strip()
            formats.append(DownloadFormat(
                format=format_name,
                url=url,
                size=None
            ))
    
    # Get cover image
    cover = None
    cover_url = book_data.get("formats", {}).get("image/jpeg")
    if cover_url:
        cover = BookCover(
            small=cover_url,
            medium=cover_url,
            large=cover_url
        )
    
    # Extract subjects and bookshelves
    subjects = book_data.get("subjects", [])
    bookshelves = book_data.get("bookshelves", [])
    
    # Extract languages
    languages = book_data.get("languages", ["en"])
    language = languages[0] if languages else "en"
    
    return GutenbergBook(
        id=str(book_data["id"]),
        gutenberg_id=book_data["id"],
        title=book_data.get("title", "Unknown Title"),
        authors=authors,
        published_date=None,  # Gutenberg doesn't provide original publication date in API
        description=None,  # Not available in API
        isbn=None,  # Public domain books typically don't have ISBNs
        pages=None,  # Not available in API
        language=language,
        publisher="Project Gutenberg",
        cover=cover,
        source="Project Gutenberg",
        downloads=book_data.get("download_count", 0),
        formats=formats,
        subjects=subjects,
        bookshelves=bookshelves,
        copyright="Public Domain"
    )


@router.get("/search", response_model=SearchResult)
async def search_books(
    q: str = Query(..., description="Search query", min_length=1),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Results per page")
):
    """
    Search books in Project Gutenberg
    
    **Examples:**
    - `/search?q=shakespeare`
    - `/search?q=science fiction&page=1&limit=10`
    """
    try:
        params = {
            "search": q,
            "page": page
        }
        
        data = await fetch_gutendex("/books", params)
        
        books = [parse_gutenberg_book(book) for book in data.get("results", [])]
        
        return SearchResult(
            query=q,
            total_results=data.get("count", 0),
            sources={"gutenberg": len(books)},
            books=books,
            page=page,
            per_page=limit
        )
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/book/{book_id}", response_model=GutenbergBook)
async def get_book(book_id: int):
    """
    Get detailed information about a specific book
    
    **book_id**: Project Gutenberg book ID (numeric)
    
    **Examples:**
    - `/book/1342` (Pride and Prejudice)
    - `/book/11` (Alice's Adventures in Wonderland)
    """
    try:
        data = await fetch_gutendex(f"/books/{book_id}")
        return parse_gutenberg_book(data)
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Book not found")
        raise HTTPException(status_code=503, detail="Gutenberg API error")
    except Exception as e:
        logger.error(f"Get book error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/popular")
async def get_popular_books(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get most popular/downloaded books from Project Gutenberg
    
    **Examples:**
    - `/popular`
    - `/popular?page=1&limit=50`
    """
    try:
        params = {
            "page": page,
            "sort": "popular"
        }
        
        data = await fetch_gutendex("/books", params)
        books = [parse_gutenberg_book(book) for book in data.get("results", [])]
        
        return {
            "total": data.get("count", 0),
            "books": books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Popular books error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/author/{author_name}")
async def get_books_by_author(
    author_name: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get books by a specific author
    
    **Examples:**
    - `/author/shakespeare`
    - `/author/jane austen`
    """
    try:
        params = {
            "search": author_name,
            "page": page
        }
        
        data = await fetch_gutendex("/books", params)
        
        # Filter to only books where author name matches
        all_books = [parse_gutenberg_book(book) for book in data.get("results", [])]
        filtered_books = [
            book for book in all_books 
            if any(author_name.lower() in author.lower() for author in book.authors)
        ]
        
        return {
            "author": author_name,
            "total": len(filtered_books),
            "books": filtered_books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Author search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/subject/{subject}")
async def get_books_by_subject(
    subject: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get books by subject/topic
    
    **Examples:**
    - `/subject/fiction`
    - `/subject/science`
    - `/subject/history`
    """
    try:
        params = {
            "topic": subject,
            "page": page
        }
        
        data = await fetch_gutendex("/books", params)
        books = [parse_gutenberg_book(book) for book in data.get("results", [])]
        
        return {
            "subject": subject,
            "total": data.get("count", 0),
            "books": books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Subject search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/languages")
async def get_available_languages():
    """
    Get list of available languages in Project Gutenberg
    """
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
            {"code": "es", "name": "Spanish"},
            {"code": "it", "name": "Italian"},
            {"code": "pt", "name": "Portuguese"},
            {"code": "fi", "name": "Finnish"},
            {"code": "nl", "name": "Dutch"},
            {"code": "zh", "name": "Chinese"},
            {"code": "ja", "name": "Japanese"}
        ]
    }


@router.get("/language/{lang_code}")
async def get_books_by_language(
    lang_code: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get books in a specific language
    
    **Examples:**
    - `/language/en` (English)
    - `/language/fr` (French)
    - `/language/de` (German)
    """
    try:
        params = {
            "languages": lang_code,
            "page": page
        }
        
        data = await fetch_gutendex("/books", params)
        books = [parse_gutenberg_book(book) for book in data.get("results", [])]
        
        return {
            "language": lang_code,
            "total": data.get("count", 0),
            "books": books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Language search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

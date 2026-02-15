"""
Google Books API Router
Provides access to Google Books metadata and previews
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
import httpx
import logging

from models import GoogleBook, SearchResult, BookCover

logger = logging.getLogger(__name__)
router = APIRouter()

GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1"


async def fetch_google_books(endpoint: str, params: dict = None) -> dict:
    """Fetch data from Google Books API"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(f"{GOOGLE_BOOKS_API}{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        logger.error(f"Error fetching from Google Books: {e}")
        raise HTTPException(status_code=503, detail="Google Books API unavailable")


def parse_google_book(volume: dict) -> GoogleBook:
    """Parse Google Books volume data into our model"""
    
    volume_info = volume.get("volumeInfo", {})
    
    # Extract authors
    authors = volume_info.get("authors", [])
    
    # Extract ISBNs
    isbn_list = []
    for identifier in volume_info.get("industryIdentifiers", []):
        if identifier.get("type") in ["ISBN_10", "ISBN_13"]:
            isbn_list.append(identifier.get("identifier"))
    
    # Get cover/thumbnail
    cover = None
    thumbnail = volume_info.get("imageLinks", {}).get("thumbnail")
    if thumbnail:
        # Google Books thumbnails are small by default, construct larger versions
        large_thumb = thumbnail.replace("&zoom=1", "&zoom=3")
        cover = BookCover(
            small=thumbnail,
            medium=thumbnail.replace("&zoom=1", "&zoom=2"),
            large=large_thumb
        )
    
    # Extract description
    description = volume_info.get("description")
    
    # Get preview and info links
    preview_link = volume_info.get("previewLink")
    info_link = volume_info.get("infoLink")
    
    # Get categories
    categories = volume_info.get("categories", [])
    
    # Get ratings
    average_rating = volume_info.get("averageRating")
    ratings_count = volume_info.get("ratingsCount")
    
    return GoogleBook(
        id=volume["id"],
        google_id=volume["id"],
        title=volume_info.get("title", "Unknown Title"),
        authors=authors,
        published_date=volume_info.get("publishedDate"),
        description=description,
        isbn=isbn_list if isbn_list else None,
        pages=volume_info.get("pageCount"),
        language=volume_info.get("language", "en"),
        publisher=volume_info.get("publisher"),
        cover=cover,
        source="Google Books",
        preview_link=preview_link,
        info_link=info_link,
        thumbnail=thumbnail,
        categories=categories,
        average_rating=average_rating,
        ratings_count=ratings_count,
        viewability=volume.get("accessInfo", {}).get("viewability")
    )


@router.get("/search", response_model=SearchResult)
async def search_books(
    q: str = Query(..., description="Search query", min_length=1),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=40, description="Results per page (max 40)")
):
    """
    Search books in Google Books
    
    **Search operators:**
    - `intitle:` - Search in title
    - `inauthor:` - Search by author
    - `inpublisher:` - Search by publisher
    - `subject:` - Search by subject
    - `isbn:` - Search by ISBN
    
    **Examples:**
    - `/search?q=python programming`
    - `/search?q=intitle:pride+inauthor:austen`
    - `/search?q=isbn:9780134685991`
    """
    try:
        start_index = (page - 1) * limit
        params = {
            "q": q,
            "startIndex": start_index,
            "maxResults": min(limit, 40),  # Google Books API limits to 40
            "printType": "books"
        }
        
        data = await fetch_google_books("/volumes", params)
        
        books = []
        for item in data.get("items", []):
            try:
                book = parse_google_book(item)
                books.append(book)
            except Exception as e:
                logger.warning(f"Error parsing book: {e}")
                continue
        
        return SearchResult(
            query=q,
            total_results=data.get("totalItems", 0),
            sources={"googlebooks": len(books)},
            books=books,
            page=page,
            per_page=limit
        )
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/book/{volume_id}", response_model=GoogleBook)
async def get_book(volume_id: str):
    """
    Get detailed information about a specific book
    
    **volume_id**: Google Books volume ID
    
    **Examples:**
    - `/book/nggnmAEACAAJ`
    """
    try:
        data = await fetch_google_books(f"/volumes/{volume_id}")
        return parse_google_book(data)
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Book not found")
        raise HTTPException(status_code=503, detail="Google Books API error")
    except Exception as e:
        logger.error(f"Get book error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/isbn/{isbn}")
async def get_book_by_isbn(isbn: str):
    """
    Get book by ISBN (10 or 13 digits)
    
    **Examples:**
    - `/isbn/9780134685991`
    - `/isbn/0134685997`
    """
    try:
        params = {
            "q": f"isbn:{isbn}"
        }
        
        data = await fetch_google_books("/volumes", params)
        
        items = data.get("items", [])
        if not items:
            raise HTTPException(status_code=404, detail="Book not found with this ISBN")
        
        return parse_google_book(items[0])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"ISBN search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/author/{author_name}")
async def get_books_by_author(
    author_name: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=40)
):
    """
    Get books by a specific author
    
    **Examples:**
    - `/author/j k rowling`
    - `/author/shakespeare`
    """
    try:
        start_index = (page - 1) * limit
        params = {
            "q": f"inauthor:{author_name}",
            "startIndex": start_index,
            "maxResults": min(limit, 40)
        }
        
        data = await fetch_google_books("/volumes", params)
        books = [parse_google_book(item) for item in data.get("items", [])]
        
        return {
            "author": author_name,
            "total": data.get("totalItems", 0),
            "books": books,
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
    limit: int = Query(20, ge=1, le=40)
):
    """
    Get books by subject/category
    
    **Examples:**
    - `/subject/fiction`
    - `/subject/computers`
    - `/subject/science`
    """
    try:
        start_index = (page - 1) * limit
        params = {
            "q": f"subject:{subject}",
            "startIndex": start_index,
            "maxResults": min(limit, 40)
        }
        
        data = await fetch_google_books("/volumes", params)
        books = [parse_google_book(item) for item in data.get("items", [])]
        
        return {
            "subject": subject,
            "total": data.get("totalItems", 0),
            "books": books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Subject search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/free-ebooks")
async def get_free_ebooks(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=40)
):
    """
    Get books that have free full-text access
    
    **Examples:**
    - `/free-ebooks`
    - `/free-ebooks?page=1&limit=30`
    """
    try:
        start_index = (page - 1) * limit
        params = {
            "q": "subject:fiction",  # General query
            "filter": "free-ebooks",
            "startIndex": start_index,
            "maxResults": min(limit, 40)
        }
        
        data = await fetch_google_books("/volumes", params)
        books = [parse_google_book(item) for item in data.get("items", [])]
        
        return {
            "total": data.get("totalItems", 0),
            "books": books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Free ebooks error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/bestsellers/{category}")
async def get_bestsellers(
    category: str = "fiction",
    limit: int = Query(20, ge=1, le=40)
):
    """
    Get bestselling books by category (approximation using orderBy relevance)
    
    **Categories:**
    - fiction
    - nonfiction
    - computers
    - business
    - self-help
    
    **Examples:**
    - `/bestsellers/fiction`
    - `/bestsellers/computers`
    """
    try:
        params = {
            "q": f"subject:{category}",
            "orderBy": "relevance",
            "maxResults": min(limit, 40)
        }
        
        data = await fetch_google_books("/volumes", params)
        books = [parse_google_book(item) for item in data.get("items", [])]
        
        return {
            "category": category,
            "books": books
        }
    except Exception as e:
        logger.error(f"Bestsellers error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

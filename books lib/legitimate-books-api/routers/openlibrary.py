"""
Open Library API Router
Provides access to Internet Archive's Open Library
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
import httpx
import logging

from models import OpenLibraryBook, SearchResult, BookCover

logger = logging.getLogger(__name__)
router = APIRouter()

OPENLIBRARY_API = "https://openlibrary.org"
COVERS_API = "https://covers.openlibrary.org/b"


async def fetch_openlibrary(endpoint: str, params: dict = None) -> dict:
    """Fetch data from Open Library API"""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(f"{OPENLIBRARY_API}{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        logger.error(f"Error fetching from Open Library: {e}")
        raise HTTPException(status_code=503, detail="Open Library API unavailable")


def parse_openlibrary_book(doc: dict) -> OpenLibraryBook:
    """Parse Open Library document into our model"""
    
    # Extract authors
    authors = []
    if "author_name" in doc:
        authors = doc["author_name"]
    
    # Extract ISBNs
    isbns = doc.get("isbn", [])
    
    # Get cover URLs
    cover = None
    if "cover_i" in doc:
        cover_id = doc["cover_i"]
        cover = BookCover(
            small=f"{COVERS_API}/id/{cover_id}-S.jpg",
            medium=f"{COVERS_API}/id/{cover_id}-M.jpg",
            large=f"{COVERS_API}/id/{cover_id}-L.jpg"
        )
    
    # Extract subjects
    subjects = doc.get("subject", [])[:10]  # Limit to first 10
    
    book_key = doc.get("key", "")
    
    return OpenLibraryBook(
        id=book_key,
        key=book_key,
        title=doc.get("title", "Unknown Title"),
        authors=authors,
        published_date=str(doc.get("first_publish_year", "")),
        description=None,  # Not available in search results
        isbn=isbns[:5] if isbns else None,  # Limit to first 5 ISBNs
        pages=doc.get("number_of_pages_median"),
        language=doc.get("language", ["en"])[0] if doc.get("language") else "en",
        publisher=doc.get("publisher", [""])[0] if doc.get("publisher") else None,
        cover=cover,
        source="Open Library",
        subjects=subjects,
        has_fulltext=doc.get("has_fulltext", False),
        lending_available=doc.get("lending_edition", False) or doc.get("ia", None) is not None,
        borrow_url=f"{OPENLIBRARY_API}{book_key}" if book_key else None,
        read_url=f"{OPENLIBRARY_API}{book_key}" if doc.get("has_fulltext") else None
    )


@router.get("/search", response_model=SearchResult)
async def search_books(
    q: str = Query(..., description="Search query", min_length=1),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Results per page")
):
    """
    Search books in Open Library
    
    **Examples:**
    - `/search?q=python programming`
    - `/search?q=shakespeare&page=1&limit=10`
    """
    try:
        offset = (page - 1) * limit
        params = {
            "q": q,
            "offset": offset,
            "limit": limit,
            "fields": "key,title,author_name,first_publish_year,isbn,cover_i,subject,number_of_pages_median,language,publisher,has_fulltext,lending_edition,ia"
        }
        
        data = await fetch_openlibrary("/search.json", params)
        
        books = [parse_openlibrary_book(doc) for doc in data.get("docs", [])]
        
        return SearchResult(
            query=q,
            total_results=data.get("numFound", 0),
            sources={"openlibrary": len(books)},
            books=books,
            page=page,
            per_page=limit
        )
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/book/{book_id:path}", response_model=OpenLibraryBook)
async def get_book(book_id: str):
    """
    Get detailed information about a specific book
    
    **book_id** can be:
    - Open Library ID (e.g., `/works/OL45804W`)
    - ISBN-10 or ISBN-13 (e.g., `0451526538`)
    
    **Examples:**
    - `/book/works/OL45804W`
    - `/book/0451526538`
    """
    try:
        # If it's an ISBN, convert to Open Library format
        if book_id.isdigit():
            endpoint = f"/isbn/{book_id}.json"
        else:
            endpoint = f"/{book_id}.json"
        
        data = await fetch_openlibrary(endpoint)
        
        # Extract basic info
        title = data.get("title", "Unknown Title")
        
        # Get authors
        authors = []
        if "authors" in data:
            for author in data["authors"]:
                author_key = author.get("author", {}).get("key") if isinstance(author.get("author"), dict) else author.get("key")
                if author_key:
                    try:
                        author_data = await fetch_openlibrary(f"{author_key}.json")
                        authors.append(author_data.get("name", "Unknown"))
                    except:
                        pass
        
        # Get cover
        cover = None
        if "covers" in data and data["covers"]:
            cover_id = data["covers"][0]
            cover = BookCover(
                small=f"{COVERS_API}/id/{cover_id}-S.jpg",
                medium=f"{COVERS_API}/id/{cover_id}-M.jpg",
                large=f"{COVERS_API}/id/{cover_id}-L.jpg"
            )
        
        # Get description
        description = None
        if "description" in data:
            desc = data["description"]
            description = desc.get("value") if isinstance(desc, dict) else str(desc)
        
        return OpenLibraryBook(
            id=book_id,
            key=data.get("key", book_id),
            title=title,
            authors=authors,
            published_date=str(data.get("publish_date", "")),
            description=description,
            isbn=data.get("isbn_13", data.get("isbn_10")),
            pages=data.get("number_of_pages"),
            language=data.get("languages", [{}])[0].get("key", "").split("/")[-1] if data.get("languages") else "en",
            publisher=data.get("publishers", [""])[0] if data.get("publishers") else None,
            cover=cover,
            source="Open Library",
            subjects=data.get("subjects", [])[:10],
            has_fulltext=False,
            lending_available=False,
            borrow_url=f"{OPENLIBRARY_API}/{book_id}",
            read_url=None
        )
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Book not found")
        raise HTTPException(status_code=503, detail="Open Library API error")
    except Exception as e:
        logger.error(f"Get book error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/subjects/{subject}")
async def get_books_by_subject(
    subject: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get books by subject/topic
    
    **Examples:**
    - `/subjects/science_fiction`
    - `/subjects/history`
    - `/subjects/programming`
    """
    try:
        offset = (page - 1) * limit
        data = await fetch_openlibrary(
            f"/subjects/{subject}.json",
            params={"offset": offset, "limit": limit}
        )
        
        books = []
        for work in data.get("works", []):
            authors = [a.get("name", "Unknown") for a in work.get("authors", [])]
            
            cover = None
            if "cover_id" in work:
                cover_id = work["cover_id"]
                cover = BookCover(
                    small=f"{COVERS_API}/id/{cover_id}-S.jpg",
                    medium=f"{COVERS_API}/id/{cover_id}-M.jpg",
                    large=f"{COVERS_API}/id/{cover_id}-L.jpg"
                )
            
            book = OpenLibraryBook(
                id=work.get("key", ""),
                key=work.get("key", ""),
                title=work.get("title", "Unknown"),
                authors=authors,
                published_date=str(work.get("first_publish_year", "")),
                description=None,
                isbn=None,
                pages=None,
                language="en",
                publisher=None,
                cover=cover,
                source="Open Library",
                subjects=[subject],
                has_fulltext=work.get("has_fulltext", False),
                lending_available=work.get("lending_edition", False),
                borrow_url=f"{OPENLIBRARY_API}{work.get('key', '')}",
                read_url=None
            )
            books.append(book)
        
        return SearchResult(
            query=f"subject:{subject}",
            total_results=data.get("work_count", 0),
            sources={"openlibrary": len(books)},
            books=books,
            page=page,
            per_page=limit
        )
    except Exception as e:
        logger.error(f"Subject search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/author/{author_id:path}")
async def get_author_books(
    author_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get books by a specific author
    
    **author_id**: Open Library author ID (e.g., `OL23919A`)
    
    **Example:**
    - `/author/OL23919A` (J.K. Rowling)
    """
    try:
        offset = (page - 1) * limit
        data = await fetch_openlibrary(
            f"/authors/{author_id}/works.json",
            params={"offset": offset, "limit": limit}
        )
        
        books = []
        for entry in data.get("entries", []):
            book = OpenLibraryBook(
                id=entry.get("key", ""),
                key=entry.get("key", ""),
                title=entry.get("title", "Unknown"),
                authors=[],  # Already known it's this author
                published_date=None,
                description=None,
                isbn=None,
                pages=None,
                language="en",
                publisher=None,
                cover=None,
                source="Open Library",
                subjects=entry.get("subjects", [])[:5],
                has_fulltext=False,
                lending_available=False,
                borrow_url=f"{OPENLIBRARY_API}{entry.get('key', '')}",
                read_url=None
            )
            books.append(book)
        
        return {
            "author_id": author_id,
            "total_works": data.get("size", 0),
            "books": books,
            "page": page,
            "per_page": limit
        }
    except Exception as e:
        logger.error(f"Author books error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

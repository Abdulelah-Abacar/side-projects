"""
Multi-Source Search Router
Aggregates results from multiple book sources
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
import httpx
import asyncio
import logging

from models import SearchResult, BookBase
from routers import openlibrary, gutenberg, googlebooks

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/all", response_model=SearchResult)
async def search_all_sources(
    q: str = Query(..., description="Search query", min_length=1),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Results per page"),
    sources: Optional[str] = Query(
        None, 
        description="Comma-separated sources: openlibrary,gutenberg,googlebooks"
    )
):
    """
    Search across all book sources simultaneously
    
    **Sources:**
    - `openlibrary` - Open Library (Internet Archive)
    - `gutenberg` - Project Gutenberg
    - `googlebooks` - Google Books
    
    **Examples:**
    - `/all?q=python programming` - Search all sources
    - `/all?q=shakespeare&sources=gutenberg,openlibrary` - Search specific sources
    - `/all?q=data science&page=1&limit=30` - Custom pagination
    """
    try:
        # Determine which sources to search
        if sources:
            source_list = [s.strip().lower() for s in sources.split(",")]
        else:
            source_list = ["openlibrary", "gutenberg", "googlebooks"]
        
        # Create tasks for parallel searching
        tasks = []
        
        if "openlibrary" in source_list:
            tasks.append(search_openlibrary(q, page, limit))
        
        if "gutenberg" in source_list:
            tasks.append(search_gutenberg(q, page, limit))
        
        if "googlebooks" in source_list:
            tasks.append(search_googlebooks(q, page, limit))
        
        # Execute all searches in parallel
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Combine results
        all_books = []
        source_counts = {}
        total_results = 0
        
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                logger.warning(f"Source {source_list[i]} failed: {result}")
                continue
            
            if isinstance(result, dict) and "books" in result:
                books = result["books"]
                source_name = source_list[i]
                source_counts[source_name] = len(books)
                all_books.extend(books)
                total_results += result.get("total_results", len(books))
        
        # Remove duplicates based on title similarity
        unique_books = deduplicate_books(all_books)
        
        # Sort by relevance (books appearing in multiple sources first)
        sorted_books = sorted(
            unique_books,
            key=lambda x: sum(1 for b in all_books if books_similar(x, b)),
            reverse=True
        )
        
        # Apply pagination to combined results
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_books = sorted_books[start_idx:end_idx]
        
        return SearchResult(
            query=q,
            total_results=len(unique_books),
            sources=source_counts,
            books=paginated_books,
            page=page,
            per_page=limit
        )
        
    except Exception as e:
        logger.error(f"Multi-source search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def search_openlibrary(q: str, page: int, limit: int) -> dict:
    """Search Open Library"""
    try:
        # Import here to avoid circular imports
        from routers.openlibrary import search_books
        result = await search_books(q=q, page=page, limit=limit)
        return {
            "books": result.books,
            "total_results": result.total_results
        }
    except Exception as e:
        logger.error(f"OpenLibrary search failed: {e}")
        return {"books": [], "total_results": 0}


async def search_gutenberg(q: str, page: int, limit: int) -> dict:
    """Search Project Gutenberg"""
    try:
        from routers.gutenberg import search_books
        result = await search_books(q=q, page=page, limit=limit)
        return {
            "books": result.books,
            "total_results": result.total_results
        }
    except Exception as e:
        logger.error(f"Gutenberg search failed: {e}")
        return {"books": [], "total_results": 0}


async def search_googlebooks(q: str, page: int, limit: int) -> dict:
    """Search Google Books"""
    try:
        from routers.googlebooks import search_books
        result = await search_books(q=q, page=page, limit=limit)
        return {
            "books": result.books,
            "total_results": result.total_results
        }
    except Exception as e:
        logger.error(f"Google Books search failed: {e}")
        return {"books": [], "total_results": 0}


def books_similar(book1: BookBase, book2: BookBase) -> bool:
    """Check if two books are similar (likely the same book)"""
    # Normalize titles for comparison
    title1 = book1.title.lower().strip()
    title2 = book2.title.lower().strip()
    
    # Check if titles are very similar
    if title1 == title2:
        return True
    
    # Check if one title contains the other (for subtitle variations)
    if title1 in title2 or title2 in title1:
        # Also check if they have common authors
        authors1 = set(a.lower() for a in book1.authors)
        authors2 = set(a.lower() for a in book2.authors)
        if authors1 & authors2:  # If there's any author overlap
            return True
    
    return False


def deduplicate_books(books: List[BookBase]) -> List[BookBase]:
    """Remove duplicate books from list"""
    unique_books = []
    seen_combinations = set()
    
    for book in books:
        # Create a unique identifier from title and first author
        title_key = book.title.lower().strip()
        author_key = book.authors[0].lower().strip() if book.authors else ""
        combination = (title_key, author_key)
        
        if combination not in seen_combinations:
            seen_combinations.add(combination)
            unique_books.append(book)
    
    return unique_books


@router.get("/compare")
async def compare_sources(
    q: str = Query(..., description="Search query", min_length=1),
    limit: int = Query(10, ge=1, le=50, description="Results per source")
):
    """
    Compare search results across all sources side-by-side
    
    Useful for seeing how different sources rank the same query.
    
    **Examples:**
    - `/compare?q=machine learning`
    - `/compare?q=shakespeare&limit=5`
    """
    try:
        # Search all sources in parallel
        tasks = [
            search_openlibrary(q, 1, limit),
            search_gutenberg(q, 1, limit),
            search_googlebooks(q, 1, limit)
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        comparison = {
            "query": q,
            "sources": {
                "openlibrary": {
                    "total": results[0].get("total_results", 0) if not isinstance(results[0], Exception) else 0,
                    "books": results[0].get("books", []) if not isinstance(results[0], Exception) else []
                },
                "gutenberg": {
                    "total": results[1].get("total_results", 0) if not isinstance(results[1], Exception) else 0,
                    "books": results[1].get("books", []) if not isinstance(results[1], Exception) else []
                },
                "googlebooks": {
                    "total": results[2].get("total_results", 0) if not isinstance(results[2], Exception) else 0,
                    "books": results[2].get("books", []) if not isinstance(results[2], Exception) else []
                }
            }
        }
        
        return comparison
        
    except Exception as e:
        logger.error(f"Comparison error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/random")
async def get_random_books(
    count: int = Query(10, ge=1, le=50, description="Number of random books")
):
    """
    Get random books from various sources
    
    **Examples:**
    - `/random`
    - `/random?count=20`
    """
    try:
        # Get popular books from different sources as "random"
        tasks = [
            search_openlibrary("science fiction", 1, count),
            search_gutenberg("classic", 1, count),
            search_googlebooks("bestseller", 1, count)
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        all_books = []
        for result in results:
            if not isinstance(result, Exception) and "books" in result:
                all_books.extend(result["books"][:count // 3])
        
        # Shuffle and limit
        import random
        random.shuffle(all_books)
        
        return {
            "count": len(all_books[:count]),
            "books": all_books[:count]
        }
        
    except Exception as e:
        logger.error(f"Random books error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

"""
Pydantic models for API request/response validation
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List, Dict, Any
from datetime import datetime


class APIInfo(BaseModel):
    """Root API information"""
    name: str
    version: str
    description: str
    sources: List[Dict[str, Any]]
    endpoints: Dict[str, str]


class BookAuthor(BaseModel):
    """Book author information"""
    name: str
    key: Optional[str] = None
    birth_date: Optional[str] = None
    death_date: Optional[str] = None
    bio: Optional[str] = None


class BookCover(BaseModel):
    """Book cover URLs"""
    small: Optional[str] = None
    medium: Optional[str] = None
    large: Optional[str] = None


class DownloadFormat(BaseModel):
    """Available download format"""
    format: str
    url: str
    size: Optional[str] = None


class BookBase(BaseModel):
    """Base book model"""
    id: str
    title: str
    authors: List[str] = []
    published_date: Optional[str] = None
    description: Optional[str] = None
    isbn: Optional[List[str]] = None
    pages: Optional[int] = None
    language: Optional[str] = None
    publisher: Optional[str] = None
    cover: Optional[BookCover] = None
    source: str = Field(..., description="Source of the book data")


class OpenLibraryBook(BookBase):
    """Open Library specific book model"""
    key: str
    subjects: List[str] = []
    has_fulltext: bool = False
    lending_available: bool = False
    borrow_url: Optional[str] = None
    read_url: Optional[str] = None


class GutenbergBook(BookBase):
    """Project Gutenberg specific book model"""
    gutenberg_id: int
    downloads: Optional[int] = None
    formats: List[DownloadFormat] = []
    subjects: List[str] = []
    bookshelves: List[str] = []
    copyright: str = "Public Domain"


class GoogleBook(BookBase):
    """Google Books specific book model"""
    google_id: str
    preview_link: Optional[str] = None
    info_link: Optional[str] = None
    thumbnail: Optional[str] = None
    categories: List[str] = []
    average_rating: Optional[float] = None
    ratings_count: Optional[int] = None
    viewability: Optional[str] = None


class SearchResult(BaseModel):
    """Multi-source search result"""
    query: str
    total_results: int
    sources: Dict[str, int] = Field(
        ..., 
        description="Number of results from each source"
    )
    books: List[BookBase]
    page: int = 1
    per_page: int = 20


class BookDetail(BaseModel):
    """Detailed book information"""
    book: BookBase
    authors_detail: Optional[List[BookAuthor]] = None
    related_books: Optional[List[BookBase]] = None
    reviews: Optional[List[Dict[str, Any]]] = None


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    status_code: int
    detail: Optional[str] = None

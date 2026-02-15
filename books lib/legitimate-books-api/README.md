# Legitimate Free Books API 📚

A comprehensive (unofficial) API service providing free access to **legal** book sources including Open Library, Project Gutenberg, and Google Books.

## 🌟 Features

- **Multi-Source Search**: Search across Open Library, Project Gutenberg, and Google Books simultaneously
- **Rich Metadata**: Get detailed book information including authors, descriptions, covers, and more
- **Download Links**: Direct links to public domain books in multiple formats (EPUB, PDF, TXT, etc.)
- **100% Legal**: All sources respect copyright and only provide access to public domain or legally available books
- **Fast & Async**: Built with FastAPI for high performance
- **Well Documented**: Interactive API documentation with Swagger UI

## 📖 Data Sources

| Source | Books Available | Type | Endpoint |
|--------|----------------|------|----------|
| **Open Library** | Millions | Lending + Public Domain | `/api/v1/openlibrary` |
| **Project Gutenberg** | 70,000+ | Public Domain | `/api/v1/gutenberg` |
| **Google Books** | Millions | Metadata + Previews | `/api/v1/googlebooks` |

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd legitimate-books-api

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

The API will be available at `http://localhost:8000`

### Docker Installation (Alternative)

```bash
docker build -t books-api .
docker run -p 8000:8000 books-api
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔍 Example Usage

### Search across all sources
```bash
curl "http://localhost:8000/api/v1/search/all?q=python%20programming&limit=10"
```

### Search Open Library
```bash
curl "http://localhost:8000/api/v1/openlibrary/search?q=shakespeare"
```

### Get book details from Gutenberg
```bash
curl "http://localhost:8000/api/v1/gutenberg/book/1342"
```

### Search by ISBN (Google Books)
```bash
curl "http://localhost:8000/api/v1/googlebooks/isbn/9780134685991"
```

### Get popular Gutenberg books
```bash
curl "http://localhost:8000/api/v1/gutenberg/popular?limit=20"
```

### Compare results across sources
```bash
curl "http://localhost:8000/api/v1/search/compare?q=artificial%20intelligence"
```

## 🛣️ API Endpoints

### Multi-Source Search
- `GET /api/v1/search/all` - Search all sources
- `GET /api/v1/search/compare` - Compare results across sources
- `GET /api/v1/search/random` - Get random books

### Open Library
- `GET /api/v1/openlibrary/search` - Search books
- `GET /api/v1/openlibrary/book/{book_id}` - Get book details
- `GET /api/v1/openlibrary/subjects/{subject}` - Browse by subject
- `GET /api/v1/openlibrary/author/{author_id}` - Get author's books

### Project Gutenberg
- `GET /api/v1/gutenberg/search` - Search books
- `GET /api/v1/gutenberg/book/{book_id}` - Get book details
- `GET /api/v1/gutenberg/popular` - Get popular books
- `GET /api/v1/gutenberg/author/{author_name}` - Search by author
- `GET /api/v1/gutenberg/subject/{subject}` - Browse by subject
- `GET /api/v1/gutenberg/language/{lang_code}` - Filter by language

### Google Books
- `GET /api/v1/googlebooks/search` - Search books
- `GET /api/v1/googlebooks/book/{volume_id}` - Get book details
- `GET /api/v1/googlebooks/isbn/{isbn}` - Search by ISBN
- `GET /api/v1/googlebooks/author/{author_name}` - Search by author
- `GET /api/v1/googlebooks/subject/{subject}` - Browse by subject
- `GET /api/v1/googlebooks/free-ebooks` - Get free ebooks

## 📊 Response Format

All endpoints return JSON. Example response:

```json
{
  "query": "python programming",
  "total_results": 1234,
  "sources": {
    "openlibrary": 456,
    "gutenberg": 12,
    "googlebooks": 789
  },
  "books": [
    {
      "id": "OL12345W",
      "title": "Learning Python",
      "authors": ["Mark Lutz"],
      "published_date": "2013",
      "description": "...",
      "isbn": ["9781449355739"],
      "pages": 1594,
      "language": "en",
      "publisher": "O'Reilly Media",
      "cover": {
        "small": "https://covers.openlibrary.org/b/id/12345-S.jpg",
        "medium": "https://covers.openlibrary.org/b/id/12345-M.jpg",
        "large": "https://covers.openlibrary.org/b/id/12345-L.jpg"
      },
      "source": "Open Library"
    }
  ],
  "page": 1,
  "per_page": 20
}
```

## 🌐 Deployment

### Deploy to Railway

1. Fork this repository
2. Sign up at [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select your forked repo
5. Railway will auto-detect and deploy

### Deploy to Render

1. Sign up at [Render.com](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repo
4. Set:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Deploy to Heroku

```bash
heroku create your-books-api
git push heroku main
```

Add `Procfile`:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 🔧 Configuration

Create a `.env` file for configuration (optional):

```env
# API Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=False

# Rate Limiting (optional)
RATE_LIMIT_PER_MINUTE=60

# CORS Origins (optional)
CORS_ORIGINS=*
```

## 🧪 Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest tests/
```

## 📝 License

This project is licensed under the MIT License. 

**Important Notes:**
- This API provides access to legally available books only
- Project Gutenberg books are in the public domain
- Open Library provides access through legal lending
- Google Books provides metadata and previews only
- Always respect copyright and terms of service

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🐛 Issues

Found a bug? Have a feature request? Please open an issue on GitHub.

## 📚 Resources

- [Open Library API Docs](https://openlibrary.org/developers/api)
- [Project Gutenberg](https://www.gutenberg.org/)
- [Google Books API](https://developers.google.com/books)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## ⚠️ Disclaimer

This is an unofficial API. It is not affiliated with, endorsed by, or connected to Open Library, Project Gutenberg, or Google Books. Use at your own risk and always comply with the terms of service of the underlying data sources.

## 🙏 Acknowledgments

- Open Library / Internet Archive for providing access to millions of books
- Project Gutenberg for preserving public domain literature
- Google Books for comprehensive book metadata
- FastAPI for the excellent web framework

---

**Made with ❤️ for book lovers and developers**

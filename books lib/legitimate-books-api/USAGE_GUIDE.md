# API Usage Guide

## Getting Started

### 1. Start the API

**Option A: Using the quick start script (Linux/Mac)**
```bash
chmod +x start.sh
./start.sh
```

**Option B: Manual setup**
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

**Option C: Using Docker**
```bash
docker-compose up
```

### 2. Access the API

- **API Base**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Common Use Cases

### 1. Search for Books

#### Search all sources at once
```bash
curl "http://localhost:8000/api/v1/search/all?q=python%20programming&limit=10"
```

#### Search only Open Library
```bash
curl "http://localhost:8000/api/v1/openlibrary/search?q=machine%20learning"
```

#### Search only Gutenberg
```bash
curl "http://localhost:8000/api/v1/gutenberg/search?q=shakespeare"
```

#### Search only Google Books
```bash
curl "http://localhost:8000/api/v1/googlebooks/search?q=data%20science"
```

### 2. Get Book Details

#### By Book ID (Open Library)
```bash
curl "http://localhost:8000/api/v1/openlibrary/book/works/OL45804W"
```

#### By Gutenberg ID
```bash
curl "http://localhost:8000/api/v1/gutenberg/book/1342"
```

#### By ISBN (Google Books)
```bash
curl "http://localhost:8000/api/v1/googlebooks/isbn/9780134685991"
```

### 3. Browse by Category/Subject

#### Open Library subjects
```bash
curl "http://localhost:8000/api/v1/openlibrary/subjects/science_fiction"
```

#### Gutenberg subjects
```bash
curl "http://localhost:8000/api/v1/gutenberg/subject/fiction"
```

#### Google Books categories
```bash
curl "http://localhost:8000/api/v1/googlebooks/subject/computers"
```

### 4. Find Books by Author

#### Open Library (requires author ID)
```bash
curl "http://localhost:8000/api/v1/openlibrary/author/OL23919A"
```

#### Gutenberg (by name)
```bash
curl "http://localhost:8000/api/v1/gutenberg/author/jane%20austen"
```

#### Google Books (by name)
```bash
curl "http://localhost:8000/api/v1/googlebooks/author/j%20k%20rowling"
```

### 5. Download Public Domain Books

```bash
# Get book details with download links
curl "http://localhost:8000/api/v1/gutenberg/book/1342" | jq '.formats'
```

The response will include download URLs for various formats:
```json
{
  "formats": [
    {
      "format": "application/epub+zip",
      "url": "https://www.gutenberg.org/ebooks/1342.epub.images",
      "size": null
    },
    {
      "format": "text/html",
      "url": "https://www.gutenberg.org/ebooks/1342.html.images",
      "size": null
    }
  ]
}
```

### 6. Get Popular Books

```bash
# Most downloaded Gutenberg books
curl "http://localhost:8000/api/v1/gutenberg/popular?limit=20"
```

### 7. Compare Search Results

```bash
# See how different sources rank the same query
curl "http://localhost:8000/api/v1/search/compare?q=artificial%20intelligence&limit=5"
```

### 8. Filter by Language

```bash
# Get French books from Gutenberg
curl "http://localhost:8000/api/v1/gutenberg/language/fr"

# Get Spanish books
curl "http://localhost:8000/api/v1/gutenberg/language/es"
```

### 9. Get Free Ebooks (Google Books)

```bash
curl "http://localhost:8000/api/v1/googlebooks/free-ebooks?limit=20"
```

## Python Examples

### Basic Search
```python
import requests

response = requests.get(
    "http://localhost:8000/api/v1/search/all",
    params={"q": "python programming", "limit": 10}
)

books = response.json()
for book in books['books']:
    print(f"{book['title']} by {', '.join(book['authors'])}")
```

### Download a Public Domain Book
```python
import requests

# Get book details
response = requests.get("http://localhost:8000/api/v1/gutenberg/book/1342")
book = response.json()

# Find EPUB format
epub_url = None
for format_info in book['formats']:
    if 'epub' in format_info['format'].lower():
        epub_url = format_info['url']
        break

if epub_url:
    # Download the book
    book_response = requests.get(epub_url)
    with open(f"{book['title']}.epub", 'wb') as f:
        f.write(book_response.content)
    print(f"Downloaded: {book['title']}.epub")
```

### Search Multiple Sources
```python
import requests
import asyncio
import aiohttp

async def search_all():
    sources = ['openlibrary', 'gutenberg', 'googlebooks']
    results = {}
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for source in sources:
            url = f"http://localhost:8000/api/v1/{source}/search"
            tasks.append(session.get(url, params={'q': 'python', 'limit': 5}))
        
        responses = await asyncio.gather(*tasks)
        
        for source, response in zip(sources, responses):
            data = await response.json()
            results[source] = data
    
    return results

# Run async search
results = asyncio.run(search_all())
```

## JavaScript/Node.js Examples

### Fetch API
```javascript
// Search for books
fetch('http://localhost:8000/api/v1/search/all?q=javascript&limit=10')
    .then(response => response.json())
    .then(data => {
        console.log(`Found ${data.total_results} books`);
        data.books.forEach(book => {
            console.log(`${book.title} by ${book.authors.join(', ')}`);
        });
    });
```

### Axios
```javascript
const axios = require('axios');

async function searchBooks(query) {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/search/all', {
            params: { q: query, limit: 10 }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

searchBooks('machine learning').then(results => {
    console.log(results);
});
```

## Advanced Usage

### Pagination
```bash
# Get page 2 with 30 results per page
curl "http://localhost:8000/api/v1/search/all?q=programming&page=2&limit=30"
```

### Filter by Specific Sources
```bash
# Only search Open Library and Gutenberg
curl "http://localhost:8000/api/v1/search/all?q=fiction&sources=openlibrary,gutenberg"
```

### Google Books Advanced Search
```bash
# Search by title
curl "http://localhost:8000/api/v1/googlebooks/search?q=intitle:pride"

# Search by author
curl "http://localhost:8000/api/v1/googlebooks/search?q=inauthor:shakespeare"

# Search by ISBN
curl "http://localhost:8000/api/v1/googlebooks/search?q=isbn:9780134685991"

# Combine operators
curl "http://localhost:8000/api/v1/googlebooks/search?q=intitle:python+inauthor:lutz"
```

## Rate Limiting

The API respects the rate limits of underlying services:
- **Open Library**: No strict limits
- **Project Gutenberg (Gutendex)**: No strict limits
- **Google Books**: 1000 requests/day (no API key), 100,000/day (with key)

Consider implementing caching if making frequent requests.

## Error Handling

### Common Error Codes
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (book/resource doesn't exist)
- `500` - Internal Server Error
- `503` - Service Unavailable (upstream API down)

### Example Error Response
```json
{
  "error": "Book not found",
  "status_code": 404
}
```

## Best Practices

1. **Use pagination** for large result sets
2. **Cache responses** when appropriate
3. **Handle errors gracefully** - external APIs can be unreliable
4. **Respect copyright** - only download public domain books
5. **Use specific sources** when you know where to look
6. **Implement retry logic** for failed requests

## Testing

Run the example script to test all endpoints:
```bash
python examples.py
```

## Need Help?

- Check the interactive docs at `/docs`
- Look at `examples.py` for more code samples
- Open an issue on GitHub
- Read the README.md for deployment options

"""
Example usage of the Legitimate Free Books API
"""

import requests
import json

# Base URL of the API
BASE_URL = "http://localhost:8000"

def print_json(data):
    """Pretty print JSON data"""
    print(json.dumps(data, indent=2))

def example_1_search_all_sources():
    """Example 1: Search across all sources"""
    print("\n" + "="*60)
    print("Example 1: Search for 'python programming' across all sources")
    print("="*60)
    
    response = requests.get(f"{BASE_URL}/api/v1/search/all", params={
        "q": "python programming",
        "limit": 5
    })
    
    data = response.json()
    print(f"\nFound {data['total_results']} results")
    print(f"Sources: {data['sources']}")
    print(f"\nFirst book:")
    if data['books']:
        book = data['books'][0]
        print(f"  Title: {book['title']}")
        print(f"  Authors: {', '.join(book['authors'])}")
        print(f"  Source: {book['source']}")

def example_2_gutenberg_popular():
    """Example 2: Get popular books from Gutenberg"""
    print("\n" + "="*60)
    print("Example 2: Top 5 popular books from Project Gutenberg")
    print("="*60)
    
    response = requests.get(f"{BASE_URL}/api/v1/gutenberg/popular", params={
        "limit": 5
    })
    
    data = response.json()
    print(f"\nTop {len(data['books'])} books:")
    for i, book in enumerate(data['books'], 1):
        print(f"\n{i}. {book['title']}")
        print(f"   Authors: {', '.join(book['authors'])}")
        print(f"   Downloads: {book.get('downloads', 'N/A')}")
        if book.get('formats'):
            print(f"   Formats: {', '.join([f['format'] for f in book['formats'][:3]])}")

def example_3_openlibrary_subject():
    """Example 3: Browse books by subject in Open Library"""
    print("\n" + "="*60)
    print("Example 3: Science Fiction books from Open Library")
    print("="*60)
    
    response = requests.get(f"{BASE_URL}/api/v1/openlibrary/subjects/science_fiction", params={
        "limit": 5
    })
    
    data = response.json()
    print(f"\nFound {data['total_results']} science fiction books")
    print(f"\nFirst 5 books:")
    for i, book in enumerate(data['books'], 1):
        print(f"\n{i}. {book['title']}")
        print(f"   Authors: {', '.join(book['authors'])}")
        if book.get('published_date'):
            print(f"   Published: {book['published_date']}")

def example_4_google_books_isbn():
    """Example 4: Look up book by ISBN"""
    print("\n" + "="*60)
    print("Example 4: Look up book by ISBN (Clean Code)")
    print("="*60)
    
    # Clean Code ISBN
    isbn = "9780132350884"
    
    response = requests.get(f"{BASE_URL}/api/v1/googlebooks/isbn/{isbn}")
    
    if response.status_code == 200:
        book = response.json()
        print(f"\nTitle: {book['title']}")
        print(f"Authors: {', '.join(book['authors'])}")
        print(f"Publisher: {book.get('publisher', 'N/A')}")
        print(f"Published: {book.get('published_date', 'N/A')}")
        print(f"Pages: {book.get('pages', 'N/A')}")
        if book.get('description'):
            print(f"Description: {book['description'][:200]}...")
    else:
        print(f"Book not found or error: {response.status_code}")

def example_5_compare_sources():
    """Example 5: Compare search results across sources"""
    print("\n" + "="*60)
    print("Example 5: Compare 'shakespeare' across sources")
    print("="*60)
    
    response = requests.get(f"{BASE_URL}/api/v1/search/compare", params={
        "q": "shakespeare",
        "limit": 3
    })
    
    data = response.json()
    print(f"\nQuery: {data['query']}")
    print("\nResults per source:")
    for source, results in data['sources'].items():
        print(f"\n{source.upper()}:")
        print(f"  Total: {results['total']}")
        if results['books']:
            print(f"  Top result: {results['books'][0]['title']}")

def example_6_gutenberg_download():
    """Example 6: Get download links for a Gutenberg book"""
    print("\n" + "="*60)
    print("Example 6: Get download links for Pride and Prejudice")
    print("="*60)
    
    # Pride and Prejudice ID
    book_id = 1342
    
    response = requests.get(f"{BASE_URL}/api/v1/gutenberg/book/{book_id}")
    
    if response.status_code == 200:
        book = response.json()
        print(f"\nTitle: {book['title']}")
        print(f"Authors: {', '.join(book['authors'])}")
        print(f"\nAvailable formats:")
        for format_info in book['formats']:
            print(f"  - {format_info['format']}: {format_info['url']}")
    else:
        print(f"Error: {response.status_code}")

def main():
    """Run all examples"""
    print("\n" + "="*60)
    print("LEGITIMATE FREE BOOKS API - Example Usage")
    print("="*60)
    print("\nMake sure the API is running at http://localhost:8000")
    print("Start it with: python main.py")
    
    try:
        # Check if API is running
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code != 200:
            print("\n❌ API is not responding. Please start the server first.")
            return
    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to API. Please start the server first:")
        print("   python main.py")
        return
    
    print("\n✓ API is running!\n")
    
    # Run examples
    example_1_search_all_sources()
    example_2_gutenberg_popular()
    example_3_openlibrary_subject()
    example_4_google_books_isbn()
    example_5_compare_sources()
    example_6_gutenberg_download()
    
    print("\n" + "="*60)
    print("Examples complete! Visit http://localhost:8000/docs for more")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()

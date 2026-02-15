#!/bin/bash

echo "📚 Bibliotheque - Starting Frontend"
echo "=================================="
echo ""

# Check if API is running
echo "🔍 Checking if API is running..."
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ API is running!"
else
    echo "⚠️  Warning: API is not running at http://localhost:8000"
    echo "   Please start the API first:"
    echo "   cd ../legitimate-books-api && python main.py"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "🚀 Starting frontend server..."
echo "   Frontend will be available at: http://localhost:8080"
echo ""
echo "📖 Open your browser and visit: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m http.server 8080
else
    echo "❌ Python not found. Opening file directly..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open index.html
    else
        echo "Please open index.html in your browser"
    fi
fi

# Bibliotheque - Books Frontend

A beautiful, elegant frontend for discovering, reading, and discussing free books from legal sources.

## 🎨 Design Philosophy

**Bibliotheque** features a distinctive literary aesthetic inspired by classic libraries and bookshops:
- **Typography**: Playfair Display for headings (elegant serif) and Crimson Text for body (readable literary serif)
- **Color Palette**: Warm earth tones - browns, creams, and paper whites that evoke old bookstores
- **Layout**: Card-based design with generous spacing and smooth animations
- **Interactions**: Gentle hover effects and transitions that feel like turning pages

## ✨ Features

### 📚 Book Discovery
- **Multi-source search** across Open Library, Project Gutenberg, and Google Books
- **Filter by source** to narrow your search
- **Beautiful book cards** with cover images
- **Responsive grid layout** that adapts to any screen size

### 📖 Reading Experience
- **Book details modal** with comprehensive information
- **Reader view** with elegant typography optimized for reading
- **Download options** for public domain books in multiple formats (EPUB, PDF, TXT)

### 💬 Discussion Features
- **Comment system** to share thoughts about books
- **Per-book discussions** kept separate for each title
- **Simple, clean interface** for engaging with other readers

### 🎯 Smart Search
- Search by title, author, or topic
- Real-time results from multiple sources
- Popular books loaded by default

## 🚀 Getting Started

### Prerequisites
- The Books API running at `http://localhost:8000`
- A modern web browser

### Installation

**Option 1: Direct Open (Simplest)**
```bash
# Just open the HTML file in your browser
open index.html
# Or on Linux:
xdg-open index.html
# Or on Windows:
start index.html
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python
python3 -m http.server 8080

# Then visit: http://localhost:8080
```

**Option 3: Using Node.js**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8080

# Visit: http://localhost:8080
```

### Important: API Configuration

The frontend expects the API to be running at `http://localhost:8000`. 

If your API is running elsewhere, edit `index.html` and change:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

To your API URL.

## 📱 Usage

### 1. Search for Books
- Enter a search query in the search bar
- Use filters to search specific sources
- Click on any book card to see details

### 2. View Book Details
- See cover, description, author, publication info
- Access download links for public domain books
- Read and post comments

### 3. Read Books
- Click "Read Now" to enter reader view
- Optimized typography for comfortable reading
- Use "Back to Library" to return

### 4. Discuss Books
- Open any book's details
- Scroll to the discussion section
- Write and post your thoughts
- See other readers' comments

## 🎨 Customization

### Change Colors
Edit the CSS variables in `index.html`:
```css
:root {
    --primary: #2c1810;      /* Dark brown */
    --secondary: #8b4513;    /* Saddle brown */
    --accent: #d4a574;       /* Tan */
    --cream: #f5f1e8;        /* Light cream */
    --paper: #faf8f3;        /* Paper white */
    --ink: #1a1410;          /* Almost black */
}
```

### Change Fonts
Edit the Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Then update the CSS:
```css
body {
    font-family: 'Your Font', serif;
}
```

### Modify Layout
The grid layout is responsive and can be adjusted:
```css
.books-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    /* Change 280px to adjust card width */
}
```

## 🔧 API Integration

The frontend connects to these API endpoints:

### Search
```javascript
GET /api/v1/search/all?q={query}&limit=20
GET /api/v1/{source}/search?q={query}&limit=20
```

### Popular Books
```javascript
GET /api/v1/gutenberg/popular?limit=20
```

### Book Details
All book data comes from the search results. For additional details, you can extend the app to fetch:
```javascript
GET /api/v1/{source}/book/{id}
```

## 🌐 Deployment

### Deploy Frontend

**Option 1: GitHub Pages**
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and folder
4. Your site will be live!

**Option 2: Netlify**
1. Drag and drop the folder to Netlify
2. Done! Instant deployment

**Option 3: Vercel**
1. Import from GitHub
2. Deploy with one click

### Important: Update API URL for Production

When deploying, update the API URL:
```javascript
// For production, use your deployed API URL
const API_BASE_URL = 'https://your-api.railway.app';
```

## 📂 File Structure

```
books-frontend/
├── index.html          # Complete single-page app
├── README.md          # This file
└── screenshots/       # Optional: Add screenshots
```

## 🎯 Features Roadmap

Potential enhancements:
- [ ] User accounts and authentication
- [ ] Personal reading lists/bookmarks
- [ ] Advanced filters (year, language, pages)
- [ ] Reading progress tracking
- [ ] Book ratings
- [ ] Social sharing
- [ ] Dark mode toggle
- [ ] PDF viewer integration
- [ ] Audio book support
- [ ] Multi-language support

## 🐛 Troubleshooting

### API Connection Issues
**Problem**: "Error connecting to API"
**Solution**: 
1. Ensure the backend is running: `python main.py`
2. Check the API is accessible at `http://localhost:8000/health`
3. Verify the API_BASE_URL in index.html

### CORS Errors
**Problem**: CORS policy blocking requests
**Solution**: The API includes CORS middleware. If issues persist:
1. Check the API's CORS configuration
2. Use a local server instead of file:// protocol
3. Add your frontend URL to API's allowed origins

### Books Not Loading
**Problem**: Empty book grid
**Solution**:
1. Check browser console for errors
2. Verify API is returning data: `curl http://localhost:8000/api/v1/gutenberg/popular`
3. Check network tab in browser dev tools

### Styling Issues
**Problem**: Fonts or styles not loading
**Solution**:
1. Check internet connection (Google Fonts need internet)
2. Clear browser cache
3. Try a different browser

## 🤝 Contributing

Want to improve Bibliotheque?
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by classic libraries and literary tradition
- Powered by Open Library, Project Gutenberg, and Google Books APIs
- Built with React and modern web technologies

---

**Happy Reading! 📚**

Start exploring thousands of free books with a beautiful, thoughtful interface designed for book lovers.

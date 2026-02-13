# Photo Gallery Frontend 📸

A modern, interactive photo gallery built with React, TypeScript, and Vite.
Features stunning glass morphism design, GSAP animations, and seamless
integration with a Node.js backend API.

## 🚀 Features

- **Modern UI/UX** - Glass morphism design with smooth animations
- **Interactive Photo Grid** - GSAP-powered spotlight effects and hover
  animations
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Authentication** - JWT-based login/register with protected routes
- **Photo Management** - Upload, edit, delete, and like photos
- **Modal System** - Image preview, forms, and alerts
- **Real-time Updates** - Instant like/unlike feedback
- **TypeScript** - Full type safety and better developer experience

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Context API
- **Form Handling**: Controlled components with React hooks

## 📁 Project Structure

```
photo-gallery-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AlertModal.tsx           # Alert/confirmation dialogs
│   │   ├── ChromaGrid.tsx           # Animated photo grid with GSAP
│   │   ├── Header.tsx               # Navigation header
│   │   ├── ImagePreviewModal.tsx    # Full-size photo preview
│   │   ├── PhotoFormModal.tsx       # Upload/edit photo forms
│   │   └── ProtectedRoute.tsx       # Route protection HOC
│   ├── context/            # React Context for state management
│   │   └── AuthContext.tsx          # Authentication state
│   ├── pages/              # Page components
│   │   ├── Home.tsx                 # Public photo gallery
│   │   ├── Login.tsx                # User authentication
│   │   ├── Profile.tsx              # User profile & photos
│   │   └── Register.tsx             # User registration
│   ├── services/           # API communication layer
│   │   └── api.ts                   # Axios instance & API calls
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── .env.example            # Environment variables template
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🏗️ Component Architecture

### Core Components

- **ChromaGrid**: Main photo display with advanced GSAP animations

  - Spotlight effects on mouse movement
  - Dynamic card interactions
  - Like functionality with optimistic updates
  - Edit/delete actions for photo owners

- **ImagePreviewModal**: Full-screen photo viewer

  - High-resolution image display
  - Like/download actions
  - Smooth transitions and overlays

- **PhotoFormModal**: Unified form for upload/edit operations

  - File validation and preview
  - Title and description inputs
  - Loading states and error handling

- **AlertModal**: Reusable notification system
  - Success, error, warning, and info types
  - Confirm/cancel actions
  - Customizable messages

### Authentication Flow

- **AuthContext**: Global authentication state management
- **ProtectedRoute**: HOC for securing private pages
- **Automatic Token Handling**: Axios interceptors for JWT management

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- Backend API server running (see backend repository)

### 1. Clone the Repository

```bash
git clone <frontend-repo-url>
cd photo-gallery-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

**Configuration Details:**

- `VITE_API_URL`: Base URL of your backend API server

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## 🎨 Styling & Design System

### Design Principles

- **Glass Morphism**: Translucent backgrounds with backdrop blur
- **Modern Aesthetics**: Clean, minimal design with strategic animations
- **Consistent Spacing**: Tailwind's spacing scale for uniformity
- **Accessibility**: Proper contrast ratios and focus states

### Color Palette

- **Primary**: Black/White with translucent overlays
- **Accent**: Red for likes, Blue for actions
- **Background**: Dark theme with glass effects

### Animation System

- **GSAP**: Advanced JavaScript animations
- **CSS Transitions**: Smooth state changes
- **Hover Effects**: Interactive feedback throughout

## 🔌 API Integration

### Service Layer (`src/services/api.ts`)

```typescript
// Authentication
login(data: LoginData): Promise<AuthResponse>
register(data: RegisterData): Promise<AuthResponse>

// Photos
getPhotos(): Promise<Photo[]>
getUserPhotos(userId: string): Promise<Photo[]>
uploadPhoto(formData: FormData): Promise<Photo>
likePhoto(photoId: string): Promise<void>
deletePhoto(photoId: string): Promise<void>
updatePhoto(photoId: string, data: PhotoUpdate): Promise<Photo>
```

### Request/Response Interceptors

- Automatic JWT token attachment
- 401 response handling (auto-logout)
- Consistent error formatting

## 🎯 Key Features Deep Dive

### ChromaGrid Animations

The ChromaGrid component uses GSAP for advanced visual effects:

```typescript
// Spotlight effect on mouse movement
const moveTo = (x: number, y: number) => {
  gsap.to(pos.current, {
    x,
    y,
    duration: damping,
    ease: "power3.out",
    onUpdate: () => {
      setX.current?.(pos.current.x);
      setY.current?.(pos.current.y);
    },
  });
};
```

### Authentication Flow

1. **Login/Register**: Credentials validated against backend
2. **Token Storage**: JWT stored in localStorage
3. **Automatic Auth**: Token automatically included in requests
4. **Protected Routes**: Unauthenticated users redirected to login

### Photo Management

- **Upload**: File validation (PNG/JPEG, max 5MB)
- **Edit**: In-place updates with optimistic UI
- **Delete**: Confirmation modal with error handling
- **Likes**: Real-time updates with rollback on errors

## 📱 Pages & Routing

### Public Routes

- `/` - Home (Public photo gallery)
- `/login` - User authentication
- `/register` - User registration

### Protected Routes

- `/profile` - User's personal photos and uploads

### Route Protection

```typescript
<ProtectedRoute>
  <Profile />
</ProtectedRoute>
```

## 🔒 Security Features

- JWT token-based authentication
- Protected routes for user-specific actions
- Input validation and sanitization
- Secure token storage and automatic cleanup

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Standards

- Use TypeScript for type safety
- Follow React best practices
- Write meaningful component and variable names
- Include proper error handling
- Maintain consistent code formatting

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend CORS is configured for your frontend URL
   - Check `VITE_API_URL` environment variable

2. **Authentication Issues**

   - Verify JWT token in localStorage
   - Check backend authentication endpoints

3. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check TypeScript compiler errors

### Debugging Tips

- Use browser DevTools for network inspection
- Check console for error messages
- Verify environment variables are set correctly

## 🔗 Related Projects

- [Backend API](https://github.com/Abdulelah-Abacar/photo-gallery-server) -
  Node.js/Express backend server

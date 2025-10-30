# MERN Stack Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that demonstrates seamless integration between front-end and back-end components. This project showcases modern web development practices including database operations, API communication, state management, authentication, and file uploads.

## 🚀 Features

### Core Functionality
- **Blog Post Management**: Create, read, update, and delete blog posts
- **Category System**: Organize posts by categories (Technology, Travel, Lifestyle, Food)
- **User Authentication**: Registration, login, and protected routes
- **Image Uploads**: Featured images for blog posts with file validation
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Search & Filtering**: Find posts by category or search terms
- **Pagination**: Efficient loading of large post lists

### Technical Features
- **RESTful API**: Well-structured Express.js API with proper error handling
- **JWT Authentication**: Secure token-based authentication system
- **Input Validation**: Server-side validation using Joi and express-validator
- **File Upload**: Multer integration for image handling
- **State Management**: React Context API for global state
- **Custom Hooks**: Reusable hooks for API calls and data fetching
- **TypeScript**: Type-safe development on the front-end

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Joi** - Data validation
- **express-validator** - Request validation middleware

### Frontend
- **React 19** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling with validation
- **Yup** - Schema validation for forms

### Development Tools
- **Nodemon** - Auto-restart for development
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
mern-stack-integration-Breezy-Reese/
├── client/                          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── context/                 # React Context providers
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API service functions
│   │   └── assets/                  # Static assets
│   ├── package.json
│   └── vite.config.ts
├── server/                          # Express backend
│   ├── controllers/                 # Route controllers
│   ├── middleware/                  # Custom middleware
│   ├── models/                      # Mongoose models
│   ├── routes/                      # API routes
│   ├── uploads/                     # Uploaded images
│   ├── db.js                        # Database connection
│   ├── server.js                    # Main server file
│   └── package.json
├── Week4-Assignment.md              # Assignment requirements
├── TODO.md                          # Current tasks
└── README.md                        # This file
```

## 🏗️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-stack-integration-Breezy-Reese
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables**

   Create `.env` files in both `server/` and `client/` directories.

   **Server (.env)**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

   **Client (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

6. **Start the development servers**

   **Terminal 1 - Backend**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /api/auth/login
Authenticate user and return JWT token.
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Post Endpoints

#### GET /api/posts
Get all published posts with pagination.
- Query parameters: `page`, `limit`, `category`, `search`

#### GET /api/posts/:id
Get a specific post by ID.

#### POST /api/posts
Create a new post (requires authentication).
```json
{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Brief description",
  "category": "category-id",
  "tags": ["tag1", "tag2"],
  "featuredImage": "image-file"
}
```

#### PUT /api/posts/:id
Update an existing post (requires authentication).

#### DELETE /api/posts/:id
Delete a post (requires authentication).

### Category Endpoints

#### GET /api/categories
Get all categories.

#### POST /api/categories
Create a new category (admin only).
```json
{
  "name": "Technology",
  "slug": "technology",
  "description": "Latest in tech",
  "color": "#007bff"
}
```

## 🎨 Screenshots

*Add screenshots of your application here showing the main pages, post creation form, and responsive design.*

## 🔧 Available Scripts

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database (local or cloud)
2. Configure environment variables
3. Build and deploy to hosting service (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built as part of Week 4 MERN Stack Integration assignment
- Inspired by modern blog platforms and best practices
- Uses open-source libraries and frameworks

---

**Note**: This is a learning project demonstrating MERN stack integration. For production use, additional security measures and optimizations would be recommended.

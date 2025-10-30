// api.ts - API service for making requests to the backend

import axios from 'axios';

// Define types for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Define types for data structures
interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  token?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  content: string;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  slug: string;
  author: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  category: Category;
  tags: string[];
  isPublished: boolean;
  viewCount: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Post API services
export const postService = {
  // Get all posts with optional pagination and filters
  getAllPosts: async (page = 1, limit = 10, category: string | null = null, search?: string): Promise<ApiResponse<Post[]>> => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  // Get a single post by ID or slug
  getPost: async (idOrSlug: string): Promise<ApiResponse<Post>> => {
    const response = await api.get(`/posts/${idOrSlug}`);
    return response.data;
  },

  // Create a new post
  createPost: async (postData: Partial<Post>): Promise<ApiResponse<Post>> => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Update an existing post
  updatePost: async (id: string, postData: Partial<Post>): Promise<ApiResponse<Post>> => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete a post
  deletePost: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // Add a comment to a post
  addComment: async (postId: string, commentData: { content: string }): Promise<ApiResponse<Post>> => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },

  // Search posts
  searchPosts: async (query: string): Promise<ApiResponse<Post[]>> => {
    const response = await api.get(`/posts/search?q=${query}`);
    return response.data;
  },
};

// Category API services
export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Create a new category
  createCategory: async (categoryData: Partial<Category>): Promise<ApiResponse<Category>> => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
};

// Auth API services
export const authService = {
  // Register a new user
  register: async (userData: { username: string; email: string; password: string; firstName: string; lastName: string }): Promise<ApiResponse<User & { token: string }>> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<User & { token: string }>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

export default api; 
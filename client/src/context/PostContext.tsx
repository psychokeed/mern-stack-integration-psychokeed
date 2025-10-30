import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { postService, categoryService } from '../services/api';

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

interface PostContextType {
  posts: Post[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  fetchPosts: (page?: number, limit?: number, category?: string, search?: string) => Promise<void>;
  fetchPost: (id: string) => Promise<Post | null>;
  createPost: (postData: any) => Promise<Post | null>;
  updatePost: (id: string, postData: any) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
  fetchCategories: () => Promise<void>;
  addComment: (postId: string, content: string) => Promise<boolean>;
  clearError: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PostContextType['pagination']>(null);

  const fetchPosts = useCallback(async (page = 1, limit = 10, category?: string, search?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await postService.getAllPosts(page, limit, category, search);

      if (response.success) {
        setPosts(response.data);
        setPagination(response.pagination || null);
      } else {
        throw new Error(response.error || 'Failed to fetch posts');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(async (id: string): Promise<Post | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await postService.getPost(id);

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to fetch post');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch post');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (postData: any): Promise<Post | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await postService.createPost(postData);

      if (response.success) {
        setPosts(prev => [response.data, ...prev]);
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create post');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, postData: any): Promise<Post | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await postService.updatePost(id, postData);

      if (response.success) {
        setPosts(prev => prev.map(post =>
          post._id === id ? response.data : post
        ));
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update post');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await postService.deletePost(id);

      if (response.success) {
        setPosts(prev => prev.filter(post => post._id !== id));
        return true;
      } else {
        throw new Error(response.error || 'Failed to delete post');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoryService.getAllCategories();

      if (response.success) {
        setCategories(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch categories');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = async (postId: string, content: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await postService.addComment(postId, { content });

      if (response.success) {
        setPosts(prev => prev.map(post =>
          post._id === postId ? response.data : post
        ));
        return true;
      } else {
        throw new Error(response.error || 'Failed to add comment');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add comment');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: PostContextType = {
    posts,
    categories,
    loading,
    error,
    pagination,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    fetchCategories,
    addComment,
    clearError,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

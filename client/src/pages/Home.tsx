import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

const Home: React.FC = () => {
  const { posts, loading, error, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts(1, 6); // Load first 6 posts for home page
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MERN Blog</h1>
        <p className="text-gray-600 text-lg">Discover amazing stories and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.slice(0, 3).map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.featuredImage && (
              <img
                src={`http://localhost:5000/uploads/${post.featuredImage}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {post.author.firstName} {post.author.lastName}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/posts"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default Home;

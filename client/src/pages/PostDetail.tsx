import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchPost, addComment } = usePosts();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        try {
          const postData = await fetchPost(id);
          setPost(postData);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPost();
  }, [id, fetchPost]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !id) return;

    try {
      const success = await addComment(id, commentContent);
      if (success) {
        setCommentContent('');
        // Refresh post data
        const updatedPost = await fetchPost(id);
        setPost(updatedPost);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error || 'Post not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.featuredImage && (
          <img
            src={`http://localhost:5000/uploads/${post.featuredImage}`}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-8">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {post.category.name}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <span>By {post.author.firstName} {post.author.lastName}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.viewCount} views</span>
          </div>

          <div className="prose max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user && user._id === post.author._id && (
            <div className="mb-8">
              <Link
                to={`/posts/${post._id}/edit`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              >
                Edit Post
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md mt-8 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Comments ({post.comments.length})
        </h2>

        {user ? (
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-600 mb-8">
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>{' '}
            to add a comment.
          </p>
        )}

        <div className="space-y-6">
          {post.comments.map((comment: any) => (
            <div key={comment._id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-gray-800">
                  {comment.user.firstName} {comment.user.lastName}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>

        {post.comments.length === 0 && (
          <p className="text-gray-500 text-center">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

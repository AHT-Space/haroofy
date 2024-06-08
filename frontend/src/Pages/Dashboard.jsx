import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserDashboard = () => {
  const user = useSelector((state) => state.user.currentUser.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('written');
  const [blogsWritten, setBlogsWritten] = useState([]);
  const [blogsLiked, setBlogsLiked] = useState([]);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get('/api/v1/users/total-likes');
        setLikes(response.data.totalLikes);
      } catch (err) {
        console.log('Failed to fetch user likes');
      }
    };

    fetchLikes();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
      
        if(activeTab === 'written'){
          const response = await axios.get('/api/v1/users/posts-me');
          setBlogsWritten(response.data);
        } else {
          const response = await axios.get('/api/v1/users/liked-posts');
          setBlogsLiked(response.data);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTab]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`/api/v1/posts/${blogId}`);
      setBlogsWritten(blogsWritten.filter((blog) => blog._id !== blogId));
    } catch (err) {
      console.error('Failed to delete blog', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="min-h-screen bg-main p-4">
      <div className="bg-[#fcfcfc] shadow-lg rounded-lg max-w-4xl mx-auto">
        {/* User Info */}
        <div className="p-6 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 sm:items-start">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src={user.profilePicture}
            alt="Profile"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">Total Likes: {likes}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-4 py-2 ${activeTab === 'written' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            >
              Blogs Written
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`px-4 py-2 ${activeTab === 'liked' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            >
              Liked Blogs
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'written' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Blogs Written</h2>
              <div className="space-y-4">
                {blogsWritten.length > 0 ? (
                  blogsWritten.map((blog) => (
                    <div
                      key={blog._id}
                      className="block bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition relative"
                    >
                      <Link to={`/article/${blog.slug}`}>
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <p className="text-gray-600">Likes: {blog.numberOfLikes}</p>
                      </Link>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <FaEdit
                          className="text-blue-500 cursor-pointer"
                          onClick={() => navigate(`/article/update/${blog._id}`)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDelete(blog._id)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No blogs written by you.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === 'liked' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Liked Blogs</h2>
              <div className="space-y-4">
                {blogsLiked.length > 0 ? (
                  blogsLiked.map((blog) => (
                    <Link
                      to={`/article/${blog.slug}`}
                      key={blog._id}
                      className="block bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
                    >
                      <h3 className="text-lg font-semibold">{blog.title}</h3>
                      <p className="text-gray-600">Author: {blog.user.name}</p>
                    </Link>
                  ))
                ) : (
                  <p>No blogs liked by you.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import { Button, Spinner } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentSection from '../component/comments/BlogComments';
import { useSelector } from'react-redux';

const ArticleDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser.user);
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(`/api/v1/posts/blog/${slug}`);
        setPost(response.data);
        
        if (response.data.likes.includes(currentUser._id)) {
          setLiked(true);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true); 
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [slug, currentUser]);

  const handleLike = async () => {
    try {
      let res;
      if (liked) {
        res = await axios.patch(`/api/v1/posts/unlike/${post._id}`);
        setLiked(false);
      } else {
        res = await axios.patch(`/api/v1/posts/like/${post._id}`);
        setLiked(true);
      }

      const { likes, numberOfLikes } = res.data;

      // Update only the likes and numberOfLikes fields
      setPost((prevPost) => ({
        ...prevPost,
        likes,
        numberOfLikes,
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  if (!post) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='bg-main'>
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <div
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </div>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>
        <span>Author: {post && post.user.name}</span>
        <span className='italic'>
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <div className='flex items-center gap-2'>
          <FaHeart
            className={`ml-1 cursor-pointer ${liked ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleLike}
          />
          <span>
            {post && post.numberOfLikes} likes 
          </span>
        </div>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post._id} />

      {/* <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <BlogCard key={post._id} post={post} />)}
        </div>
      </div> */}
    </main>
    </div>
  );
};

export default ArticleDetails;

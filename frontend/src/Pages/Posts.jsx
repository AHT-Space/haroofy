import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../component/articles/ArticleCard';
import Header from '../component/Header';

const Posts = () => {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent-to-oldest');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/v1/posts');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    
    setArticles((prevArticles) => {
      const sortedArticles = [...prevArticles].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        
        if (newSortOrder === 'recent-to-oldest') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
      
      return sortedArticles;
    });
  };

  return (
    <div className='bg-main'>
      <div className="border-b border-black mb-4">
        <Header />
      </div>
      <div className="max-w-screen-xl mx-auto min-h-screen p-4">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl font-bold max-[639px]:mb-4">All Blogs</h1>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-main border border-mainb rounded p-2"
          >
            <option value="recent-to-oldest">Recent to Oldest</option>
            <option value="oldest-to-recent">Oldest to Recent</option>
          </select>
        </div>
        <div className="grid gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;

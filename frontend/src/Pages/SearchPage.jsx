import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from '../component/articles/ArticleCard';
import Header from '../component/Header';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      fetchSearchResults(initialQuery);
    }
  }, [searchParams]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/posts/post/search`, {
        params: { q: query },
      });
      setArticles(response.data.posts);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
    fetchSearchResults(searchQuery);
  };

  return (
    <div className="bg-main">
      <div className="border-b border-black mb-4">
        <Header />
      </div>
      <div className="max-w-screen-xl mx-auto p-4 min-h-screen">
        <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-main px-4 py-2 w-full outline-none border-black border rounded-full"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Search
          </button>
        </form>
        {searchQuery && !loading && (
          <p className="mb-4">Results for: "{searchQuery}"</p>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))
            ) : (
              <p>No results found for "{searchQuery}"</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import RightArticleCard from "./RightArticleCard";
import { useLocation } from "react-router-dom";
import CategoriesComponent from "../CategoriesComponent";

function Articles() {
  const [curCategory, setCurCategory] = useState("Personal Development");
  const [articles, setArticles] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");

    if (categoryParam) {
      setCurCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await axios.get(`api/v1/posts/post/category?category=${curCategory.toLowerCase().replace(/ /g, '')}`);
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchArticles();
  }, [curCategory]);

  useEffect(() => {
    async function fetchTopArticles() {
      try {
        const res = await axios.get(`api/v1/posts/post/top`);
        setTopArticles(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTopArticles();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen">
      <CategoriesComponent curCategory={curCategory} setCurCategory={setCurCategory} />
      <div className="grid grid-cols-1 min-[900px]:grid-cols-[2fr,1fr] gap-5 mt-12">
        <div className="overflow-y-auto border-r border-gray-300 min-[750px]:pr-16 pl-2 pr-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="hidden min-[900px]:block overflow-y-auto">
          <p className="pb-6 font-bold">Top Rated Blogs</p>
          {topArticles.map((article) => (
            <RightArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;

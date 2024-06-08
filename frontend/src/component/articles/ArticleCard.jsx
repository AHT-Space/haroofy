import React from 'react';
import { formattedDate } from '../../utils/formattedDate';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const date = formattedDate(article.createdAt);

  const handleClick = () => {
    navigate(`/article/${article.slug}`);
  };

  return (
    <div
      className="w-full pb-8 pt-4 border-b border-gray-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="grid grid-cols-[1fr_4fr] gap-4">
        <div className="self-center">
          <img
            className="h-20 min[400px]:h-24 sm:h-28 w-full object-cover"
            src={article.image}
            alt="Blog Image"
          />
        </div>

        <div className="grid grid-cols-1">
          <div className="uppercase tracking-wide text-lg sm:text-base md:text-lg lg:text-lg xl:text-lg text-mainb font-bold">{article.title}</div>
          <div className="flex items-center self-end">
            <svg className="w-5 h-5 fill-current text-gray-500 mr-2" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
            <span className="text-gray-600">{article.numberOfLikes} Likes</span>
          </div>
          <div className="hidden sm:block sm:grid sm:grid-cols-2 self-end">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span className="text-gray-600">{article.user.name}</span>
            </div>
            <p className='max-[780px]:justify-self-end text-gray-600 lg:text-base xl:text-base'>{date}</p>
          </div>
        </div>
      </div>
          <div className="sm:hidden block grid grid-cols-2 self-end pt-4">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span className="text-gray-600">{article.user.name}</span>
            </div>
            <p className='justify-self-end text-gray-600 sm:text-sm'>{date}</p>
          </div>
    </div>
  );
};

export default ArticleCard;


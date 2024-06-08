import React from 'react';
import { formattedDate } from '../../utils/formattedDate';
import { useNavigate } from 'react-router-dom';

const RightArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const date = formattedDate(article.createdAt);

  const handleClick = () => {
    navigate(`/article/${article.slug}`);
  };
  return (
    <div className="w-3/4 overflow-hidden pb-2 cursor-pointer mb-5"
     onClick={handleClick}>
        <div className="px-2">
          <div className='flex items-center gap-2 pb-2'>
            <img src={article.user.profilePicture} className="w-6 h-6 rounded-full object-cover" />
            <div className="text-gray-600 text-xs font-semibold">{article.user.name}</div>
          </div>
          <div className="uppercase tracking-wide text-sm text-mainb font-semibold pb-1">{article.title}</div>
          <div className="text-gray-600 text-sm">{date}</div>
        </div>
    </div>
  );
};

export default RightArticleCard;

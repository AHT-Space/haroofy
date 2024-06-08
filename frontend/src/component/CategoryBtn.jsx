import React from 'react';
import { useNavigate } from'react-router-dom';
import { useSelector } from 'react-redux';

function CategoryBtn({ name, clicked, setCurCategory }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  function onClickCategory(category) {
    if(currentUser) {
      setCurCategory(category);
    } else {
      navigate('/login');
    }
  }

  return (
    <div>
      <button
        className={`${
          clicked ? "bg-mainb text-main" : "text-black"
        } h-full w-full py-2 px-3 border border-black rounded-full text-sm sm:text-base`}
        onClick={() => onClickCategory(name)}
      >
        {name}
      </button>
    </div>
  );
}

export default CategoryBtn;

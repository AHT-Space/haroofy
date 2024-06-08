import { useState, useEffect } from 'react';
import CategoryBtn from './CategoryBtn';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Personal Development",
  "Technology",
  "Health and Wellness",
  "Travel",
  "Food and Drink",
  "Fashion and Beauty",
  "Finance",
  "Lifestyle",
  "Entertainment",
  "Business",
];

export default function CategoriesComponent({ curCategory, setCurCategory }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showHideButton, setShowHideButton] = useState(true);
  const [visibleCategories, setVisibleCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth < 400) {
        setVisibleCategories(categories.slice(0, 3));
      } else if (windowWidth < 640) {
        setVisibleCategories(categories.slice(0, 5));
      } else {
        setVisibleCategories(categories.slice(0, 8));
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function toggleCurCategory(category) {
    setCurCategory(category);
    navigate(`?category=${category}`);
  }

  function toggleShowCategories() {
    setShowCategories((prevState) => !prevState);
    setShowHideButton((prevState) => !prevState);
  }

  return (
    <div className="pl-2 flex justify-between py-4">
      <div className="grid lg:grid-cols-4 min-[570px]:grid-cols-3 min-[400px]:grid-cols-2 grid-cols-1 gap-3 ">
        {showCategories &&
          categories.map((cat) => (
            <CategoryBtn
              key={cat}
              name={cat}
              clicked={cat === curCategory}
              setCurCategory={toggleCurCategory}
            />
          ))}
        {!showCategories &&
          visibleCategories.map((cat) => (
            <CategoryBtn
              key={cat}
              name={cat}
              clicked={cat === curCategory}
              setCurCategory={toggleCurCategory}
            />
          ))}
        {(showHideButton || showCategories) && (
          <button onClick={toggleShowCategories} className="bg-gray-700 text-white p-2 rounded-md">
            {showCategories ? "... Hide Categories" : "All Categories ..."}
          </button>
        )}
      </div>
      {/* <div className=" basis-32 h-11">
          <button className="h-full w-full  p-2 border border-black ">
            All Blogs
          </button>
        </div> */}
    </div>
  );
}

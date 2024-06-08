import BlogsCarousel from './BlogsCarousel';
import { useNavigate } from'react-router-dom';
import { useSelector } from 'react-redux';

function LatestBlogs() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  function onClickCategory(category) {
    if(currentUser) {
      navigate(`/allBlogs`);
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto py-3">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-4xl sm:text-5xl">Latest Blogs</h1>
        <div className="basis-32">
          <button className="h-full w-full p-2 border border-black rounded-full"
            onClick={onClickCategory}>
            All Blogs
          </button>
        </div>
      </div>
      <BlogsCarousel />
    </div>
  );
}

export default LatestBlogs;

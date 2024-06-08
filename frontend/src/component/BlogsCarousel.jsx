import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function BlogsCarousel() {
    const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);

    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 840) { 
          setCenterSlidePercentage(33.33);
        } else if (windowWidth >= 500) { 
          setCenterSlidePercentage(50);
        } else {
          setCenterSlidePercentage(100);
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
  return (
     <div>
        <div className="hidden lg:grid grid-cols-4 gap-5">
        <BlogCard
          blog_img="https://images.unsplash.com/photo-1714611446679-6059b55d824e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <BlogCard
          blog_img="https://images.unsplash.com/photo-1455894127589-22f75500213a?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <BlogCard
          blog_img="https://images.unsplash.com/photo-1678531730622-ef1ffd14ac1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <BlogCard
          blog_img="https://images.unsplash.com/photo-1605262221574-a1d0fc44aac0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="lg:hidden">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          centerMode={true}
          centerSlidePercentage={centerSlidePercentage}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} className="custom-control">
                &lt;
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} className="custom-control">
                &gt;
              </button>
            )
          }
        >
          <div className="p-2">
            <BlogCard
              blog_img="https://images.unsplash.com/photo-1714611446679-6059b55d824e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="p-2">
            <BlogCard
              blog_img="https://images.unsplash.com/photo-1455894127589-22f75500213a?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="p-2">
            <BlogCard
              blog_img="https://images.unsplash.com/photo-1678531730622-ef1ffd14ac1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className="p-2">
            <BlogCard
              blog_img="https://images.unsplash.com/photo-1605262221574-a1d0fc44aac0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              author_img="https://images.unsplash.com/photo-1649503116494-b07b8f561c21?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </Carousel>
      </div>
     </div>
  )
}

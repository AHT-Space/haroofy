import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 640) { 
          setSlidesToShow(3)
        } else if (windowWidth >= 370) { 
          setSlidesToShow(2)
        } else {
          setSlidesToShow(1)
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 7000,
    slidesToShow: slidesToShow, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll per swipe
    autoplay: true,
    autoplaySpeed: 0, // Set to 0 to disable autoplay
    cssEase: "linear",
    pauseOnHover: false,
  };

  const images = [
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D",
    "https://images.unsplash.com/photo-1519160558534-579f5106e43f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D",
    "https://images.unsplash.com/photo-1505744386214-51dba16a26fc?q=80&w=1906&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D",
  ];

  return (
    <div className="overflow-hidden max-w-full">
      <Slider {...settings} className="w-full">
        {images.map((image, index) => (
          <div key={index} className=""> {}
            <div className="mx-4 lg:mx-8">
              <img
                className="rounded-lg h-full w-full object-cover aspect-[3/2]"
                src={image}
                alt=""
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;

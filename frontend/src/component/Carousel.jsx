import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 7000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="overflow-hidden max-w-full">
      <Slider {...settings} className="w-full">
        <div className="">
          <div className=" mx-8 ">
            <img
              className="rounded-lg h-full w-full object-cover aspect-[3/2]"
              src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <div className=" mx-8 ">
            <img
              className=" rounded-lg h-full w-full object-cover aspect-[3/2]"
              src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <div className="mx-8">
            <img
              className="rounded-lg h-full w-full object-cover aspect-[3/2]"
              src="https://images.unsplash.com/photo-1519160558534-579f5106e43f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <div className="mx-8">
            <img
              className="rounded-lg h-full w-full object-cover aspect-[3/2]"
              src="https://images.unsplash.com/photo-1505744386214-51dba16a26fc?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;

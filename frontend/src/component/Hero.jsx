import Carousel from "./Carousel";
function Hero() {
  return (
    <div className="max-w-screen-xl mx-auto  ">
      <div className="  flex justify-around flex-col min-h-dvh">
        <h1 className="text-6xl min-[340px]:text-7xl sm:text-8xl font-serif px-2">Read Write Share</h1>
        <div className="">
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Hero;

import Header from "../component/Header";
import Hero from "../component/Hero";
import LatestBlogs from "../component/LatestBlogs";
import TopPicks from "../component/TopPicks";
function HomePage() {
  return (
    <div className="bg-main">
      <div className="border-b border-black">
        <Header />
      </div>
      <Hero />
      <LatestBlogs />
      <div className="bg-mainb">
        <TopPicks />
      </div>
    </div>
  );
}

export default HomePage;

import Header from "../component/Header";
import Articles from "../component/articles/Articles";


function WelcomePage() {
  return (
    <div className="bg-main">
      <div className="border-b border-black">
        <Header />
      </div>
      <Articles />
    </div>
  );
}

export default WelcomePage;

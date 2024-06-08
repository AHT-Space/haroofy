import { useState } from "react";
import BlogsCarousel from "./BlogsCarousel";
import CategoriesComponent from "./CategoriesComponent";

function Categries() {
  const [curCategory, setCurCategory] = useState("Personal Development");

  return (
    <div className="max-w-screen-xl mx-auto">
      <CategoriesComponent curCategory={curCategory} setCurCategory={setCurCategory} />
      <div className="mt-12">
        <BlogsCarousel />
      </div>
    </div>
  );
}

export default Categries;

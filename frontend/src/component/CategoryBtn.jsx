function CategoryBtn({ name, clicked, setCurCategory }) {
  console.log(clicked);
  function onClickCategory(category) {
    setCurCategory(category);
  }
  return (
    <div>
      <button
        className={`${
          clicked ? "bg-mainb text-main" : ""
        } h-full w-full  py-2  px-3 border border-black rounded-full`}
        onClick={() => onClickCategory(name)}
      >
        {name}
      </button>
    </div>
  );
}

export default CategoryBtn;

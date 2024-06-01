function BlogCard({ author_img, blog_img }) {
  return (
    <div className="p-1">
      <div className="border-b-black border pb-3">
        <img
          className="rounded-md w-full h-full object-cover aspect-[4/3]"
          src={blog_img}
          alt=""
        />
      </div>
      <div className="border-b-black border pb-3">
        <div className="flex items-center gap-4 py-2">
          <div className="basis-10">
            <img
              className="w-full h-full aspect-square object-cover rounded-full"
              src={author_img}
              alt=""
            />
          </div>
          <p className="font-medium">Julias fernandez aushwitz</p>
        </div>
        <h2 className="font-bold text-lg">
          The Art of Perfect Pasta: Tips and Tricks
        </h2>
        <p className="text-red-700 font-bold py-2">2 Feb 2024</p>
        <p>
          Mastering the art of pasta is easier than you think! Start with
          high-quality ingredients for the best results....
        </p>
      </div>
    </div>
  );
}

export default BlogCard;

import BlogCard from "./BlogCard";
function LatestBlogs() {
  return (
    <div className="max-w-screen-xl mx-auto py-3">
      <div className="flex justify-between items-center ">
        <h1 className="font-serif text-5xl">Latest Blogs</h1>
        <div className="basis-32">
          <button className="h-full w-full  p-2 border border-black rounded-full">
            All Blogs
          </button>
        </div>
      </div>
      <div className="grid  grid-cols-4 gap-5 mt-12">
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
    </div>
  );
}

export default LatestBlogs;

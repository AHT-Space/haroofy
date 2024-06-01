function TopPicks() {
  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      <h1 className="font-serif text-5xl text-white p-3">OUR TOP PICKS</h1>
      <div className="gap-5 p-2 grid grid-cols-[1fr_minmax(0,400px)] grid-rows-[18rem_18rem] ">
        <div className="row-span-2 py-5 relative">
          <img
            className="h-full w-full object-cover aspect-[5/3]"
            src="https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute bg-main w-full bottom-0 p-3">
            <h2 className="text-3xl p-2">
              The Future of AI: Transforming Everyday Life
            </h2>
            <p className="p-2">
              Discover how artificial intelligence is reshaping various
              industries and what to expect in the near future.
            </p>
          </div>
        </div>
        <div className="pt-5 relative">
          <img
            className="h-full w-full object-cover aspect-[5/3]"
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute bg-main w-full bottom-0">
            <h2 className="text-xl p-2 ">
              The Future of AI: Transforming Everyday Life
            </h2>
          </div>
        </div>
        <div className="pb-5 relative">
          <img
            className="h-full w-full object-cover aspect-[5/3]"
            src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute bg-main w-full bottom-0">
            <h2 className="text-xl p-2 ">
              The Future of AI: Transforming Everyday Life
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopPicks;

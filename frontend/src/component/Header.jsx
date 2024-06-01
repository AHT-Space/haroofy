function Header() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between p-2 items-center">
        <div className="basis-80 h-10">
          <input
            type="text"
            placeholder="Search"
            className="bg-main px-4 h-full w-full outline-none  border-black border rounded-full"
          />
        </div>
        <div className="grow">
          <ul className="flex justify-end gap-5  h-full ">
            <li className=" p-2">Home</li>
            <li className=" p-2">Categories</li>
            <li className=" p-2">Write</li>
            <li className=" p-2">Sign in</li>

            <li className="basis-32">
              <button className="h-full w-full  p-2 border border-black rounded-full">
                Register
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

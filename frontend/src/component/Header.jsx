import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { BiPencil } from'react-icons/bi';
import axios from 'axios';
import { signoutSuccess } from '../redux/user/userSlice'; 

function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/v1/users/logout'); 
      dispatch(signoutSuccess());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between p-2 items-center">
        {/* Search Bar */}
        <div className="basis-80 h-10 hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="bg-main px-4 h-full w-full outline-none border-black border rounded-full"
          />
        </div>
        <div className="md:hidden flex items-center">
          <AiOutlineSearch className="text-2xl cursor-pointer" onClick={toggleSearch} />
        </div>

        <div className="grow">
            {!currentUser ? (
              <ul className="flex justify-end gap-5 h-full cursor-pointer items-center">
                <li className="p-2 hidden lg:block"><Link to='/write'>Write</Link></li>
                <li className="p-2">
                  <Link to="/login">Sign in</Link>
                </li>
                <li className="basis-32">
                  <Link to="/signup">
                    <button className="h-full w-full p-2 border border-black rounded-full">
                      Register
                    </button>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex justify-end gap-5 h-full cursor-pointer items-center">
                <li className="p-2 lg:block"><Link to='/allBlogs'>All Blogs</Link></li>
                {/* <li className="p-2 hidden lg:block"><Link to='/write'>Write</Link></li> */}
                <li className="hidden lg:block">
                <Link to='/write' className="flex items-center">
                  <BiPencil className="mr-1" /> Write
                </Link>
              </li>
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    src={currentUser.user.profilePicture}
                    onClick={toggleDropdown}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#fafafa] border border-gray-200 rounded-md shadow-lg">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/write"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 lg:hidden"
                      >
                        Write
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </ul>
            )}
        </div>
      </div>
      {searchOpen && (
        <div className="flex items-center p-2 border-t border-b border-gray-300">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="bg-main px-4 py-2 w-full outline-none border-black border rounded-full"
          />
          <button 
            onClick={handleSearchSubmit} 
            className="ml-2 px-4 py-2 bg-[#0E7490] text-white rounded-full"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;


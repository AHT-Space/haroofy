import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ScrollToTop from "./utils/scrollToTop";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Write from "./Pages/Write";
import PrivateRoute from "./utils/privateRoute";
import PostDetails from "./Pages/PostDetails";
import UpdatePost from "./Pages/updatePost";
import Posts from "./Pages/Posts";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Dashboard />} /> 
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/write" element={<Write/>} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/article/update/:postId" element={<UpdatePost/>} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/article/:slug" element={<PostDetails />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/allBlogs" element={<Posts />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

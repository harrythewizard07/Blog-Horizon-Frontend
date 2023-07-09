import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./components/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProfileInfo from "./components/ProfileInfo";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/userContext";
import Categories from "./pages/Categories";
import UpdatePost from "./components/UpdatePost";
import LandingPage from "./components/LandingPage";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/categories/:categoryId" element={<Categories />} />

          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path=":userId/profile-info" element={<ProfileInfo />} />
            <Route path="update-blog/:postId" element={<UpdatePost />} />
            <Route path="update-user/:userId" element={<UpdateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

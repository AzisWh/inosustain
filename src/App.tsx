import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoadingWrapper from './components/Loading/LoadingWrapper';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import ContactUs from './pages/Contact/ContactUs';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Roledua from './pages/testauth/Roledua';
import Rolesatu from './pages/testauth/Rolesatu';
import PrivateRoute from './PrivateRoute';
import { Toaster } from 'react-hot-toast';
import AllArticle from './pages/Article/AllArticle';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import PostArticle from './pages/Article/PostArticle';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import UserArticle from './pages/Article/UserArticle';
import AllBlog from './pages/Blog/AllBlog';
import DetailBlogUser from './pages/Blog/DetailBlogUser';
//
import TestArtikel from './pages/testauth/TestArtikel';
// admin
import { Dashboard } from './pages/Admin/pages/dashboard/Dashboard';
import ArticleAdmin from './pages/Admin/pages/ArticleAdmin/ArticleAdmin';
import UpdateArticle from './pages/Admin/pages/ArticleAdmin/UpdateArticle';
import StatusUpdateArticle from './pages/Admin/pages/UpdateArticle/StatusUpdateArticle';
import BlogBerita from './pages/Admin/pages/BlogBerita/BlogBerita';
import DetailBlog from './pages/Admin/pages/BlogBerita/DetailBlog';
import EditBlog from './pages/Admin/pages/BlogBerita/EditBlog';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigateToLogin } from './api/axiosInterceptor';
import { useDispatch } from 'react-redux';
import { authService } from './api/authServices';
import { logout, setToken } from './redux/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setNavigateToLogin(() => () => navigate('/login'));

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        console.log('Token kadaluarsa saat aplikasi dimuat');
        authService.logout().catch((error) => {
          console.error('Gagal logout, melanjutkan logout lokal:', error);
        });
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
      } else {
        dispatch(setToken(storedToken));
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const timeoutMinutes = 5;
    const timeoutMs = timeoutMinutes * 60 * 1000;
    let lastActivity = Date.now();

    const resetTimer = () => {
      lastActivity = Date.now();
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    const checkIdle = async () => {
      const currentTime = Date.now();
      const token = localStorage.getItem('token');
      if (token && currentTime - lastActivity > timeoutMs) {
        console.log('Pengguna idle terlalu lama, logout...');
        try {
          await authService.logout();
          console.log('Logout berhasil');
        } catch (logoutError) {
          console.error('Gagal logout, melanjutkan logout lokal:', logoutError);
        }
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
      }
    };

    const interval = setInterval(checkIdle, 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [dispatch, navigate]);
  return (
    <div>
      <LoadingWrapper>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article" element={<AllArticle />} />
          <Route path="/articleDetail/:id" element={<ArticleDetail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/blog" element={<AllBlog />} />
          <Route path="/detailBlogUser/:id" element={<DetailBlogUser />} />

          {/* admin */}

          <Route
            path="/dashboard-admin"
            element={<PrivateRoute component={Dashboard} requiredRole={2} />}
          />
          <Route
            path="/article-admin"
            element={<PrivateRoute component={ArticleAdmin} requiredRole={2} />}
          />
          <Route
            path="/update-article"
            element={
              <PrivateRoute component={UpdateArticle} requiredRole={2} />
            }
          />
          <Route
            path="/statusupdate/:id"
            element={
              <PrivateRoute component={StatusUpdateArticle} requiredRole={2} />
            }
          />
          <Route
            path="/blog-admin"
            element={<PrivateRoute component={BlogBerita} requiredRole={2} />}
          />
          <Route
            path="/detailBlog/:id"
            element={<PrivateRoute component={DetailBlog} requiredRole={2} />}
          />
          <Route
            path="/editBlog/:id"
            element={<PrivateRoute component={EditBlog} requiredRole={2} />}
          />

          {/* route user */}
          <Route
            path="/userArticle"
            element={<PrivateRoute component={UserArticle} requiredRole={1} />}
          />
          <Route
            path="/postArticle"
            element={<PrivateRoute component={PostArticle} requiredRole={1} />}
          />
        </Routes>
      </LoadingWrapper>
    </div>
  );
}

export default App;

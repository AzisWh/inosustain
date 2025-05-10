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
//
import TestArtikel from './pages/testauth/TestArtikel';
// admin
import { Dashboard } from './pages/Admin/pages/dashboard/Dashboard';
import ArticleAdmin from './pages/Admin/pages/ArticleAdmin/ArticleAdmin';
import UpdateArticle from './pages/Admin/pages/ArticleAdmin/UpdateArticle';
import StatusUpdateArticle from './pages/Admin/pages/UpdateArticle/StatusUpdateArticle';

function App() {
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

          {/* route user */}
          <Route
            path="/userArticle"
            element={<PrivateRoute component={UserArticle} requiredRole={1} />}
          />
          <Route
            path="/postArticle"
            element={<PrivateRoute component={PostArticle} requiredRole={1} />}
          />

          {/* tes route */}
          <Route path="/allArticle" element={<TestArtikel />} />
          <Route path="/DetailArticle/:id" element={<ArticleDetail />} />

          <Route
            path="/roledua"
            element={<PrivateRoute component={Roledua} requiredRole={2} />}
          />
          <Route
            path="/rolesatu"
            element={<PrivateRoute component={Rolesatu} requiredRole={2} />}
          />
        </Routes>
      </LoadingWrapper>
    </div>
  );
}

export default App;

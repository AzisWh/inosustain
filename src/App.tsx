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
//
import TestArtikel from './pages/testauth/TestArtikel';
import TestDetailArtikel from './pages/testauth/TestDetailArtikel';

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

          {/* route user */}
          <Route
            path="/postArticle"
            element={<PrivateRoute component={PostArticle} requiredRole={0} />}
          />

          {/* tes route */}
          <Route path="/allArticle" element={<TestArtikel />} />
          <Route path="/DetailArticle/:id" element={<TestDetailArtikel />} />

          <Route
            path="/roledua"
            element={<PrivateRoute component={Roledua} requiredRole={1} />}
          />
          <Route
            path="/rolesatu"
            element={<PrivateRoute component={Rolesatu} requiredRole={1} />}
          />
        </Routes>
      </LoadingWrapper>
    </div>
  );
}

export default App;

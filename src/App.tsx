import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoadingWrapper from './components/Loading/LoadingWrapper';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import ContactUs from './pages/Contact/ContactUs';
import Test from './pages/Projects/test';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';

function App() {
  return (
    <div>
      <LoadingWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*  */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </LoadingWrapper>
    </div>
  );
}

export default App;

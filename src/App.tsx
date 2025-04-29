import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingWrapper from './components/Loading/LoadingWrapper';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import ContactUs from './pages/Contact/ContactUs';
import Test from './pages/Projects/test';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Roledua from './pages/testauth/Roledua';
import Rolesatu from './pages/testauth/Rolesatu';
import PrivateRoute from './PrivateRoute';

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

          {/* tes route */}
          <Route
            path="/roledua"
            element={<PrivateRoute component={Roledua} requiredRole={0} />}
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

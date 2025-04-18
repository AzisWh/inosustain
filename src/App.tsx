import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoadingWrapper from './components/Loading/LoadingWrapper';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <div>
      <LoadingWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </LoadingWrapper>
    </div>
  );
}

export default App;

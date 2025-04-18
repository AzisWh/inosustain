import { StrictMode } from 'react';
import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/font/Net-Arlon-Bold.ttf';
import './assets/font/DMSans.ttf';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

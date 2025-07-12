import { StrictMode } from 'react';
import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/font/Net-Arlon-Bold.ttf';
import './assets/font/DMSans.ttf';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LanguageProvider } from './context/BahasaContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider> 
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

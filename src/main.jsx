// index.jsx or main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.js'; // ✅ make sure this path is correct
import './index.css';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>

);

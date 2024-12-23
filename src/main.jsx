import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import './index.css';
import store from '~/store/store.js';
import '~/translations/i18n.js';
import { ToastProvider } from '~/providers/ToastProvider.jsx';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ToastProvider>
            <App />
        </ToastProvider>
    </Provider>,
);

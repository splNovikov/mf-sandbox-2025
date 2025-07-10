import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Bootstrap function for module federation
const mount = (el: HTMLElement) => {
    createRoot(el).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

// If we are in development and in isolation, mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('root');
    if (devRoot) {
        mount(devRoot);
    }
}

// We are running through container and we should export the mount function
export { mount };

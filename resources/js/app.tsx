import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/app.css';
import { CartProvider } from './contexts/CartContext';
import { initializeTheme } from './hooks/use-appearance';
import i18n from './i18n';

// Grab the DOM element
const el = document.getElementById('app')!;
const appName = import.meta.env.VITE_APP_NAME || 'Resteel';

// Render the Inertia app with i18n context and suspense
createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <React.StrictMode>
                <CartProvider>
                    <I18nextProvider i18n={i18n}>
                        <Suspense fallback={<div>Loading translations...</div>}>
                            <App {...props} />
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </Suspense>
                    </I18nextProvider>
                </CartProvider>
            </React.StrictMode>,
        );
    },
    title: (title) => `${title} - ${appName}`,
    progress: { color: '#4B5563' },
});

// Set light / dark mode on load
initializeTheme();

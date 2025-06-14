import '../css/app.css';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { initializeTheme } from './hooks/use-appearance';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Grab the DOM element
const el = document.getElementById('app')!;
const appName = import.meta.env.VITE_APP_NAME || 'Resteel';

// Render the Inertia app with i18n context and suspense
createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<div>Loading translations...</div>}>
            <App {...props} />
          </Suspense>
        </I18nextProvider>
      </React.StrictMode>
    );
  },
  title: (title) => `${title} - ${appName}`,
  progress: { color: '#4B5563' },
});

// Set light / dark mode on load
initializeTheme();

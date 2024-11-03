import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Detecta y aplica el modo oscuro/claro en base a las preferencias del sistema
function applySystemThemePreference() {
  // Verifica si el usuario prefiere el modo oscuro
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDarkMode);
}

// Llama a la función para establecer el modo oscuro o claro
applySystemThemePreference();

// Escucha los cambios de preferencia del sistema y los aplica
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  document.documentElement.classList.toggle('dark', event.matches);
});

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});

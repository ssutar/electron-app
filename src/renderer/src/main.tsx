import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './i18n';
import { BlockLoader } from '@/components/ui/Loaders';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<BlockLoader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
);

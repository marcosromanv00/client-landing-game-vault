'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Import bootstrap and attach it to window
    const initBootstrap = async () => {
      try {
        const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        // @ts-expect-error attaching to window
        window.bootstrap = bootstrap.default || bootstrap;
      } catch (err) {
        console.error('Error loading Bootstrap:', err);
      }
    };

    initBootstrap();
  }, []);
  return null;
}

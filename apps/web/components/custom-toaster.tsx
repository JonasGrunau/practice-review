'use client';

import { useTheme } from 'next-themes';
import { Toaster, ToasterProps } from 'sonner';

export default function CustomToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        style: {
          background:
            theme === 'dark' ? 'lab(8.30603 0.618205 -2.16572)' : '#ffffff',
        },
      }}
    />
  );
}

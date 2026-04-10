// app/layout.tsx ou components/ClientLayout.tsx
'use client';

import { useEffect } from 'react';
import { handleHashOnLoad } from '@/utils/scrollUtils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    handleHashOnLoad();
  }, []);

  return <>{children}</>;
}
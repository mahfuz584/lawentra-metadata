'use client';

import { QueryClient, QueryClientProvider as RQProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return <RQProvider client={queryClient}>{children}</RQProvider>;
};

export default QueryProvider;

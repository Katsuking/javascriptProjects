import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface QueryProviderType {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderType) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

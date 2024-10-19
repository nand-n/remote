'use client';

import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import NotificationMessage from '@/components/common/notification/notificationMessage';
import { useRouter } from 'next/navigation';

/**
 * Interface for the props of the ReactQueryWrapper component
 * @property children - The child components to be wrapped by the QueryClientProvider
 */

interface ReactQueryWrapperProps {
  children: ReactNode;
}
/**
 * ReactQueryWrapper component that provides the QueryClient to its children
 *
 * @param children The child components to be wrapped by the QueryClientProvider
 * @returns The QueryClientProvider wrapping the children
 */

const ReactQueryWrapper: React.FC<ReactQueryWrapperProps> = ({ children }) => {
  const router = useRouter();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError(error: any, query) {
        if (error.response) {
          if (error.response.status === 401) {
            router.replace('/authentication/login');
          }
          NotificationMessage.error({
            message: 'Error',
            description: error.response.data.message,
          });
        } else {
          NotificationMessage.error({
            message: 'Error',
            description: error.message,
          });
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryWrapper;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner"
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster richColors/>
    </QueryClientProvider>
  );
}

export default MyApp;

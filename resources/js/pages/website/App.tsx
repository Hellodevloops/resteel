import Header from '@/components/layout/Header';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface AppProps {
    children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <Header />
            {children}
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;

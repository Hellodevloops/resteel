import About from '@/components/home/About';
import BuildingDetail from '@/components/home/BuildingDetail';
import Buildings from '@/components/home/Buildings';
import Contact from '@/components/home/Contact';
import Index from '@/components/home/Index';
import NotFound from '@/components/home/NotFound';
import Privacy from '@/components/home/Privacy';
import Services from '@/components/home/Services';
import Terms from '@/components/home/Terms';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/buildings" element={<Buildings />} />
                    <Route path="/buildings/:id" element={<BuildingDetail />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;

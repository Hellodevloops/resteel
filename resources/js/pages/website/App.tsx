import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import About from '@/pages/website/About';
import Buildings from '@/pages/website/Buildings';
import Contact from '@/pages/website/Contact';
import Index from '@/pages/website/Index';
import NotFound from '@/pages/website/NotFound';
import Services from '@/pages/website/Services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import BuildingDetail from './BuildingDetail';
import Header from '@/components/layout/Header';
import Career from './Career';
import Privacy from './Privacy';
import Terms from './Terms';
import WebShop from './WebShop';

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Toaster />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/buildings" element={<Buildings />} />
                    {/* <Route path="/buildings/:id" element={<BuildingDetail />} /> */}
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="career" element={<Career />} />
                    <Route path="webshop" element={<WebShop />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;

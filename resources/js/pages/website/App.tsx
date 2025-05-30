
import Header from '@/components/layout/Header';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './About';
import Buildings from './Buildings';
import Contact from './Contact';
import Index from './Index';
import NotFound from './NotFound';
import Services from './Services';
// import BuildingDetail from './BuildingDetail';
import Career from './Career';
import ContactPage from './ContactPage';
import Privacy from './Privacy';
import Terms from './Terms';
import WebShop from './WebShop';

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
   <Sonner />
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
          <Route path="contactpage" element={<ContactPage />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;

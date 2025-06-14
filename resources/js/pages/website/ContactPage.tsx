import Footer from '@/components/layout/Footer';
import ContactCTA from './Contact';
import Header from '@/components/layout/Header';

const ContactPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <ContactCTA />
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;

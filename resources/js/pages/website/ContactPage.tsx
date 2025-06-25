'use client';

import Layout from './Layout';
import ContactCTA from './Contact';

const ContactPage = () => {
  return (
    <Layout title="Contact Us | Resteel">
      <main className="min-h-screen mt-16 sm:mt-20">
        <ContactCTA />
      </main>
    </Layout>
  );
};

export default ContactPage;

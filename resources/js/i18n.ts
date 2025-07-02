import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Read Inertia page props injected into <div id="app" data-page>
const el = document.getElementById('app')!;
const page = JSON.parse(el.dataset.page!);
const { locale, fallback_locale, translations, supported_locales } = page.props;

// Pre-defined translations for all languages
const predefinedTranslations = {
    en: {
        // Navigation
        home: 'Home',
        about_us: 'About Us',
        shop: 'Shop',
        services: 'Services',
        contact: 'Contact',
        contact_us: 'Contact Us',
        cart: 'Cart',
        language: 'Language',

        // Hero Section
        hero_title: 'Premium Second-Hand Industrial Buildings',
        hero_subtitle: 'Sustainable steel structures for your business needs. Quality guaranteed, environmentally responsible.',
        hero_engineering_title: 'Engineering',
        hero_tomorrows: "Tomorrow's",
        hero_infrastructure: 'Infrastructure',
        hero_description: 'Delivering world-class steel fabrication and construction solutions with precision and innovation.',

        // Features - Hero Page
        precision_engineering: 'Precision Engineering',
        precision_engineering_desc: 'Advanced CAD/CAM systems ensure millimeter-perfect fabrication',
        on_time_delivery: 'On-Time Delivery',
        on_time_delivery_desc: 'Rigorous project management ensures deadlines are always met',
        sustainable_solutions: 'Sustainable Solutions',
        sustainable_solutions_desc: 'Eco-friendly processes and materials for a greener future',
        why_choose_title: 'Why Choose',
        why_choose_resteel: 'Resteel Solutions?',
        why_choose_subtitle: 'Combining expertise with cutting-edge technology',

        // About Page
        about_hero_title: 'Redefining Steel Construction',
        about_hero_subtitle:
            'At Resteel, we give second-hand steel constructions a powerful second life — with sustainability, scale, and precision.',
        who_we_are: 'Who We Are',
        our_mission: 'Our Mission',
        integrity: 'Integrity',
        expertise: 'Expertise',
        innovation: 'Innovation',
        what_we_offer: 'What We Offer',
        steel_halls: 'Steel Halls',
        assembly_services: 'Assembly Services',
        project_guidance: 'Project Guidance',
        certified_steel: 'Certified Steel',
        across_borders: 'Across Borders',
        lets_build_sustainable: "Let's Build Something Sustainable",
        get_in_touch: 'Get In Touch',

        // Services
        services_we_provide: 'Services',
        we_provide: 'We Provide',
        premium_resale: 'Premium Re-Sale',
        premium_resale_desc: 'Access a wide selection of vetted second-hand steel buildings ready for new purpose.',
        assembly_disassembly: 'Assembly & Disassembly',
        assembly_disassembly_desc: 'From full dismounting to site setup, we manage both ends of the lifecycle.',
        transport_logistics: 'Transport & Logistics',
        transport_logistics_desc: 'International transport across Europe with partner fleets and freight planning.',
        equipment_tracking: 'Equipment Tracking',
        equipment_tracking_desc: "Get visibility, safety, and updates throughout your building's relocation journey.",
        services_subtitle: 'More than just buying and selling — we help move, manage, and optimize every structure',

        // Buildings
        featured: 'Featured',
        buildings: 'Buildings',
        warehouses: 'Warehouses',
        halls: 'Halls',
        other: 'Other',
        commercial: 'Commercial',
        industrial: 'Industrial',
        featured_buildings_subtitle: 'Explore our curated selection of premium second-hand buildings, ready for relocation with expert precision.',
        view_all_buildings: 'View All Buildings',
        available_buildings: 'Available Buildings',
        construction: 'Construction',
        total_area: 'Total Area',
        main_hall: 'Main Hall',
        office_space: 'Office Space',
        loading_dock: 'Loading Dock',
        specifications: 'Specifications',
        details: 'Details',
        view: 'View',
        more: 'more',
        all: 'All',
        video: 'Video',
        sale: 'Sale',

        // WebShop
        webshop: 'Webshop',
        premium_structures: 'Premium Structures',
        webshop_subtitle: 'Discover our extensive collection of high-quality steel products for all your construction needs',
        all_products: 'All Products',
        search_products_placeholder: 'Search premium steel products...',
        no_products_found: 'No products found',
        search_criteria_no_match: "We couldn't find any products matching your search criteria.",
        in_stock: 'In Stock',
        out_of_stock: 'Out of Stock',
        sold_out: 'Sold Out',
        add_to_cart_failed: 'Failed to add item to cart. Please try again.',
        contact_about_product: 'Contact about product',
        filters: 'Filters',
        categories: 'Categories',
        add_to_cart: 'Add to Cart',

        // WebShop Item Detail
        loading_product: 'Loading Product...',
        loading_product_details: 'Loading product details...',
        product_not_found: 'Product not found',
        failed_to_load_product_details: 'Failed to load product details',
        back_to_products: 'Back to Products',
        request_information: 'Request Information',
        watch_video: 'Watch Video',
        key_features: 'Key Features',
        product_description: 'Product Description',
        all_features: 'All Features',

        // Status & Common
        loading: 'Loading...',
        not_available: 'N/A',
        not_specified: 'Not specified',
        untitled: 'Untitled',
        unknown: 'Unknown',
        uncategorized: 'Uncategorized',
        no_buildings_found: 'No buildings found',
        check_back_later: 'Check back later for new listings',
        failed_to_load_buildings: 'Failed to load buildings',
        try_different_filter: 'Try selecting a different filter',

        // FeaturesPreview Component
        why_choose_us: 'Why Choose Us',
        why_choose_us_subtitle:
            'We combine decades of experience with a broad European network to make steel trading fast, transparent, and effective',
        europe_wide_reach: 'Europe-Wide Reach',
        europe_wide_reach_desc: 'We advertise your listings across 20+ countries through our network of verified buyers and partners.',
        end_to_end_support: 'End-to-End Support',
        end_to_end_support_desc: 'We manage the full lifecycle — disassembly, transport, and reassembly included.',
        years_of_trust: '20+ Years of Trust',
        years_of_trust_desc: "Since 2000, we've helped hundreds of industrial and agri businesses relocate or resell steel halls.",

        // CarouselSection Component
        discover_our_latest_structures: 'Discover Our Latest Structures',
        latest_structures_subtitle: 'New steel halls, warehouses, and frames — ready to relocate.',
        explore_all: 'Explore all',

        // Testimonials Component
        what_our_clients_say: 'What Our Clients Say',
        real_results_subtitle: 'Real results from real businesses across Europe and beyond',

        // Contact Component
        expert_consultation: 'Expert Consultation',
        ready_to_build_great: 'Ready to Build Something Great?',
        transform_vision_subtitle: 'Transform your vision into reality with our precision engineering and decades of expertise.',
        send_us_message: 'Send us a message',
        respond_soon: "We'll respond as soon as possible.",
        name_required: 'Name *',
        email_required: 'Email *',
        message_required: 'Message *',
        sending: 'Sending...',
        email_inquiries: 'Email Inquiries',
        direct_consultation: 'Direct Consultation',
        visit_our_facility: 'Visit Our Facility',
        schedule_tour: 'Schedule Tour',

        // NewsletterSection Component
        stay_updated_with: 'Stay Updated with',
        industry_insights: 'Industry Insights',
        newsletter_weekly_desc: 'Get the latest updates on steel solutions, trends, and engineering innovation—delivered to your inbox every week.',
        enter_your_email: 'Enter your email',
        project_support_24_7: '24/7 Project Support',
        satisfied_clients_500: '500+ Satisfied Clients',
        weekly_updates: 'Weekly updates',

        // Footer Component
        resteel_solutions: 'Resteel Solutions',
        footer_company_desc: 'Specialists in buying and selling second-hand buildings and construction materials with over 20 years of experience.',
        engineering_excellence_since: 'Engineering Excellence Since 1985.',

        // Building Details
        loading_property: 'Loading Property',
        loading_property_details: 'Loading Property Details',
        please_wait_while_we_fetch: 'Please wait while we fetch the information...',
        property_not_found: 'Property Not Found',
        property_not_found_description: "The property you're looking for doesn't exist or has been removed.",
        back_to_properties: 'Back to Properties',
        back: 'Back',
        built: 'Built',
        per_m2: 'per m²',
        contact_for_details: 'Contact for details',
        contact_for_price: 'Contact for Price',
        no_description_available: 'No description available.',
        warehouse: 'Warehouse',
        property_stats: 'Property Stats',
        property_type: 'Property Type',
        property_description: 'Property Description',
        construction_details: 'Construction Details',
        total_building_area: 'Total Building Area',
        no_specifications_available: 'No specifications available',
        interested_title: 'Interested in This Property?',
        interested_text: 'Get in touch with our team for more details and to schedule a viewing.',
        view_similar: 'View Similar Properties',
        view_all_features: 'View All {{count}} Features',
        watch_video_tour: 'Watch Video Tour',

        // ContactForm
        contact_form_interested_in: 'I am interested in {{product}}. Please provide more information.',
        contact_form_success_message: "Thank you! Your inquiry has been submitted successfully. We'll get back to you within 24 hours.",
        contact_form_unexpected_response: 'Unexpected response format. Please try again.',
        contact_form_validation_error: 'Please correct the errors below and try again.',
        contact_form_csrf_error: 'Security token expired. Please refresh the page and try again.',
        contact_form_server_error: 'Server error occurred. Please try again later.',
        contact_form_network_error: 'Network error. Please check your connection and try again.',
        contact_form_unexpected_error: 'An unexpected error occurred. Please try again.',
        interested_in: 'Interested in',
        full_name: 'Full Name',
        enter_full_name: 'Enter your full name',
        email_address: 'Email Address',
        email_placeholder: 'your.email@company.com',
        phone_placeholder: '+1 (555) 123-4567',
        company: 'Company',
        company_placeholder: 'Your company name',
        inquiry_type: 'Inquiry Type',
        general_inquiry: 'General Inquiry',
        existing_customer_support: 'Existing Customer Support',
        partnership_opportunity: 'Partnership Opportunity',
        message: 'Message',
        message_placeholder: 'Tell us more about your requirements or questions...',
        sent_successfully: 'Sent Successfully!',
        send_inquiry: 'Send Inquiry',
        contact_form_privacy_note: "By submitting this form, you agree to our privacy policy. We'll get back to you within 24 hours.",

        // WebShop Item Detail (additional)
        view_more_products: 'View More Products',

        // Common
        browse_structures: 'Browse Structures',
        lets_work_together: "Let's Work Together",
        terms: 'Terms',
        privacy: 'Privacy',

        // Hero2 Component
        hero2_title: 'Buy & Sell Used Steel Structures Across Europe',
        hero2_subtitle: 'From agricultural halls to industrial warehouses — trusted relocation and resale since 2000.',
        browse_structures_btn: 'Browse Structures',
        sell_your_property_btn: 'Sell Your Property',

        // Contact Copy Component (additional)
        send_message_btn: 'Send Message',

        // Cart Component
        shopping: 'Shopping',
        order_summary: 'Order Summary',
        subtotal: 'Subtotal',
        tax: 'Tax',
        shipping: 'Shipping',
        total: 'Total',
        free: 'Free',
        proceed_to_checkout: 'Proceed to Checkout',
        cart_empty: 'Your Cart is Empty',
        cart_empty_subtitle: 'Start building your future with our premium steel structures',
        cart_empty_description: 'Add some amazing steel structures to get started!',
        cart_review_subtitle: 'Review your selected items and proceed to secure checkout',
        your_items: 'Your Items',
        clear_cart: 'Clear Cart',
        each: 'each',
        remove: 'Remove',
        free_shipping: 'Free Shipping',
        free_shipping_subtitle: 'On orders over €500',
        quality_guarantee: 'Quality Guarantee',
        quality_guarantee_subtitle: 'Certified materials',
        fast_processing: 'Fast Processing',
        fast_processing_subtitle: '24-48 hour handling',
        browse_warehouses: 'Browse Warehouses',
        browse_products: 'Browse Products',
        product: 'Product',
    },
    de: {
        // Navigation
        home: 'Startseite',
        about_us: 'Über uns',
        shop: 'Shop',
        services: 'Dienstleistungen',
        contact: 'Kontakt',
        contact_us: 'Kontaktieren Sie uns',
        cart: 'Warenkorb',
        language: 'Sprache',

        // Hero Section
        hero_title: 'Premium Second-Hand Industriegebäude',
        hero_subtitle: 'Nachhaltige Stahlkonstruktionen für Ihre Geschäftsanforderungen. Qualität garantiert, umweltverantwortlich.',
        hero_engineering_title: 'Ingenieurswesen',
        hero_tomorrows: 'von morgen',
        hero_infrastructure: 'Infrastruktur',
        hero_description: 'Lieferung von Weltklasse-Stahlfertigung und Baulösungen mit Präzision und Innovation.',

        // Features - Hero Page
        precision_engineering: 'Präzisions-Engineering',
        precision_engineering_desc: 'Fortschrittliche CAD/CAM-Systeme gewährleisten millimetergenaue Fertigung',
        on_time_delivery: 'Pünktliche Lieferung',
        on_time_delivery_desc: 'Rigoroses Projektmanagement stellt sicher, dass Termine immer eingehalten werden',
        sustainable_solutions: 'Nachhaltige Lösungen',
        sustainable_solutions_desc: 'Umweltfreundliche Prozesse und Materialien für eine grünere Zukunft',
        why_choose_title: 'Warum wählen',
        why_choose_resteel: 'Resteel Solutions?',
        why_choose_subtitle: 'Kombination von Expertise mit modernster Technologie',

        // About Page
        about_hero_title: 'Stahlbau neu definieren',
        about_hero_subtitle:
            'Bei Resteel geben wir gebrauchten Stahlkonstruktionen ein kraftvolles zweites Leben — mit Nachhaltigkeit, Größe und Präzision.',
        who_we_are: 'Wer wir sind',
        our_mission: 'Unsere Mission',
        integrity: 'Integrität',
        expertise: 'Expertise',
        innovation: 'Innovation',
        what_we_offer: 'Was wir anbieten',
        steel_halls: 'Stahlhallen',
        assembly_services: 'Montageservice',
        project_guidance: 'Projektberatung',
        certified_steel: 'Zertifizierter Stahl',
        across_borders: 'Grenzüberschreitend',
        lets_build_sustainable: 'Lassen Sie uns etwas Nachhaltiges bauen',
        get_in_touch: 'Kontakt aufnehmen',

        // Services
        services_we_provide: 'Dienstleistungen',
        we_provide: 'Die Wir Anbieten',
        premium_resale: 'Premium-Wiederverkauf',
        premium_resale_desc: 'Zugang zu einer breiten Auswahl geprüfter Second-Hand-Stahlgebäude, bereit für neue Zwecke.',
        assembly_disassembly: 'Montage & Demontage',
        assembly_disassembly_desc: 'Von der vollständigen Demontage bis zur Standorteinrichtung verwalten wir beide Enden des Lebenszyklus.',
        transport_logistics: 'Transport & Logistik',
        transport_logistics_desc: 'Internationaler Transport durch Europa mit Partnerflotten und Frachtplanung.',
        equipment_tracking: 'Geräteverfolgung',
        equipment_tracking_desc: 'Erhalten Sie Sichtbarkeit, Sicherheit und Updates während der Verlagerung Ihres Gebäudes.',
        services_subtitle: 'Mehr als nur Kauf und Verkauf — wir helfen beim Bewegen, Verwalten und Optimieren jeder Struktur',

        // Buildings
        featured: 'Ausgewählt',
        buildings: 'Gebäude',
        warehouses: 'Lagerhäuser',
        halls: 'Hallen',
        other: 'Andere',
        commercial: 'Gewerblich',
        industrial: 'Industriell',
        featured_buildings_subtitle:
            'Entdecken Sie unsere kuratierte Auswahl an hochwertigen Second-Hand-Gebäuden, bereit für die Verlagerung mit Expertenpräzision.',
        view_all_buildings: 'Alle Gebäude anzeigen',
        available_buildings: 'Verfügbare Gebäude',
        construction: 'Konstruktion',
        total_area: 'Gesamtfläche',
        main_hall: 'Haupthalle',
        office_space: 'Büroraum',
        loading_dock: 'Laderampe',
        specifications: 'Spezifikationen',
        details: 'Details',
        view: 'Ansehen',
        more: 'mehr',
        all: 'Alle',
        video: 'Video',
        sale: 'Verkauf',

        // WebShop
        webshop: 'Webshop',
        premium_structures: 'Premium-Strukturen',
        webshop_subtitle: 'Entdecken Sie unsere umfangreiche Sammlung hochwertiger Stahlprodukte für alle Ihre Baubedürfnisse',
        all_products: 'Alle Produkte',
        search_products_placeholder: 'Premium-Stahlprodukte suchen...',
        no_products_found: 'Keine Produkte gefunden',
        search_criteria_no_match: 'Wir konnten keine Produkte finden, die Ihren Suchkriterien entsprechen.',
        in_stock: 'Auf Lager',
        out_of_stock: 'Nicht vorrätig',
        add_to_cart_failed: 'Fehler beim Hinzufügen zum Warenkorb. Bitte versuchen Sie es erneut.',
        contact_about_product: 'Kontakt bezüglich Produkt',
        filters: 'Filter',
        categories: 'Kategorien',
        add_to_cart: 'In den Warenkorb',

        // Status & Common
        loading: 'Lädt...',
        not_available: 'N/V',
        not_specified: 'Nicht angegeben',
        untitled: 'Ohne Titel',
        unknown: 'Unbekannt',
        uncategorized: 'Unkategorisiert',
        no_buildings_found: 'Keine Gebäude gefunden',
        check_back_later: 'Schauen Sie später für neue Angebote vorbei',
        failed_to_load_buildings: 'Fehler beim Laden der Gebäude',
        try_different_filter: 'Versuchen Sie einen anderen Filter zu wählen',

        // FeaturesPreview Component
        why_choose_us: 'Warum uns wählen',
        why_choose_us_subtitle:
            'Wir kombinieren jahrzehntelange Erfahrung mit einem breiten europäischen Netzwerk, um den Stahlhandel schnell, transparent und effektiv zu gestalten',
        europe_wide_reach: 'Europaweite Reichweite',
        europe_wide_reach_desc: 'Wir bewerben Ihre Angebote in über 20 Ländern durch unser Netzwerk verifizierter Käufer und Partner.',
        end_to_end_support: 'Rundum-Betreuung',
        end_to_end_support_desc: 'Wir verwalten den gesamten Lebenszyklus — Demontage, Transport und Wiedermontage inklusive.',
        years_of_trust: '20+ Jahre Vertrauen',
        years_of_trust_desc:
            'Seit 2000 haben wir Hunderten von Industrie- und Landwirtschaftsunternehmen beim Umzug oder Wiederverkauf von Stahlhallen geholfen.',

        // CarouselSection Component
        discover_our_latest_structures: 'Entdecken Sie unsere neuesten Strukturen',
        latest_structures_subtitle: 'Neue Stahlhallen, Lagerhäuser und Rahmen — bereit für die Verlagerung.',
        explore_all: 'Alle erkunden',

        // Testimonials Component
        what_our_clients_say: 'Was unsere Kunden sagen',
        real_results_subtitle: 'Echte Ergebnisse von echten Unternehmen in ganz Europa und darüber hinaus',

        // Contact Component
        expert_consultation: 'Expertenberatung',
        ready_to_build_great: 'Bereit, etwas Großartiges zu bauen?',
        transform_vision_subtitle: 'Verwandeln Sie Ihre Vision mit unserer Präzisionstechnik und jahrzehntelanger Erfahrung in die Realität.',
        send_us_message: 'Senden Sie uns eine Nachricht',
        respond_soon: 'Wir antworten so schnell wie möglich.',
        name_required: 'Name *',
        email_required: 'E-Mail *',
        message_required: 'Nachricht *',
        sending: 'Senden...',
        email_inquiries: 'E-Mail-Anfragen',
        direct_consultation: 'Direkte Beratung',
        visit_our_facility: 'Besuchen Sie unsere Einrichtung',
        schedule_tour: 'Tour planen',

        // NewsletterSection Component
        stay_updated_with: 'Bleiben Sie auf dem Laufenden mit',
        industry_insights: 'Brancheneinblicken',
        newsletter_weekly_desc:
            'Erhalten Sie die neuesten Updates zu Stahllösungen, Trends und technischen Innovationen — wöchentlich in Ihr Postfach geliefert.',
        enter_your_email: 'Geben Sie Ihre E-Mail ein',
        project_support_24_7: '24/7 Projektunterstützung',
        satisfied_clients_500: '500+ zufriedene Kunden',
        weekly_updates: 'Wöchentliche Updates',

        // Footer Component
        resteel_solutions: 'Resteel Solutions',
        footer_company_desc: 'Spezialisten für den Kauf und Verkauf von gebrauchten Gebäuden und Baumaterialien mit über 20 Jahren Erfahrung.',
        engineering_excellence_since: 'Ingenieursexzellenz seit 1985.',

        // Building Details
        loading_property: 'Immobilie wird geladen',
        loading_property_details: 'Immobiliendetails werden geladen',
        please_wait_while_we_fetch: 'Bitte warten Sie, während wir die Informationen abrufen...',
        property_not_found: 'Immobilie nicht gefunden',
        property_not_found_description: 'Die gesuchte Immobilie existiert nicht oder wurde entfernt.',
        back_to_properties: 'Zurück zu den Immobilien',
        back: 'Zurück',
        built: 'Gebaut',
        per_m2: 'pro m²',
        contact_for_details: 'Kontakt für Details',
        contact_for_price: 'Kontakt für Preis',
        no_description_available: 'Keine Beschreibung verfügbar.',
        warehouse: 'Warehouse',
        property_stats: 'Immobilienstatistiken',
        property_type: 'Immobilientyp',
        property_description: 'Immobilienbeschreibung',
        construction_details: 'Konstruktionsdetails',
        total_building_area: 'Gesamtgebäudefläche',
        no_specifications_available: 'Keine Spezifikationen verfügbar',
        interested_title: 'Interesse an dieser Immobilie?',
        interested_text: 'Kontaktieren Sie unser Team für weitere Details und um eine Besichtigung zu vereinbaren.',
        view_similar: 'Ähnliche Immobilien anzeigen',
        view_all_features: 'Alle {{count}} Eigenschaften anzeigen',
        watch_video_tour: 'Video-Tour ansehen',

        // ContactForm
        contact_form_interested_in: 'Ich interessiere mich für {{product}}. Bitte geben Sie mir weitere Informationen.',
        contact_form_success_message:
            'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.',
        contact_form_unexpected_response: 'Unerwartetes Antwortformat. Bitte versuchen Sie es erneut.',
        contact_form_validation_error: 'Bitte korrigieren Sie die folgenden Fehler und versuchen Sie es erneut.',
        contact_form_csrf_error: 'Sicherheitstoken abgelaufen. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.',
        contact_form_server_error: 'Serverfehler aufgetreten. Bitte versuchen Sie es später erneut.',
        contact_form_network_error: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
        contact_form_unexpected_error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        interested_in: 'Interesse an',
        full_name: 'Vollständiger Name',
        enter_full_name: 'Geben Sie Ihren vollständigen Namen ein',
        email_address: 'E-Mail-Adresse',
        email_placeholder: 'ihre.email@firma.com',
        phone_placeholder: '+49 (555) 123-4567',
        company: 'Firma',
        company_placeholder: 'Ihr Firmenname',
        inquiry_type: 'Anfragetyp',
        general_inquiry: 'Allgemeine Anfrage',
        existing_customer_support: 'Bestehender Kundensupport',
        partnership_opportunity: 'Partnerschaftsmöglichkeit',
        message: 'Nachricht',
        message_placeholder: 'Erzählen Sie uns mehr über Ihre Anforderungen oder Fragen...',
        sent_successfully: 'Erfolgreich gesendet!',
        send_inquiry: 'Anfrage senden',
        contact_form_privacy_note:
            'Mit dem Absenden dieses Formulars stimmen Sie unserer Datenschutzrichtlinie zu. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.',

        // WebShop Item Detail (additional)
        view_more_products: 'Weitere Produkte anzeigen',

        // Common
        browse_structures: 'Strukturen durchsuchen',
        lets_work_together: 'Lassen Sie uns zusammenarbeiten',
        terms: 'Bedingungen',
        privacy: 'Datenschutz',

        // Hero2 Component
        hero2_title: 'Gebrauchte Stahlkonstruktionen kaufen und verkaufen',
        hero2_subtitle: 'Von landwirtschaftlichen Hallen bis zu Industrielagern — vertrauensvolle Verlagerung und Wiederverkauf seit 2000.',
        browse_structures_btn: 'Strukturen durchsuchen',
        sell_your_property_btn: 'Ihre Immobilie verkaufen',

        // Contact Copy Component (additional)
        send_message_btn: 'Nachricht senden',

        // Cart Component
        shopping: 'Einkaufen',
        order_summary: 'Bestellübersicht',
        subtotal: 'Zwischensumme',
        tax: 'Steuer',
        shipping: 'Versand',
        total: 'Gesamt',
        free: 'Kostenlos',
        proceed_to_checkout: 'Zur Kasse gehen',
        cart_empty: 'Ihr Warenkorb ist leer',
        cart_empty_subtitle: 'Beginnen Sie mit dem Aufbau Ihrer Zukunft mit unseren hochwertigen Stahlkonstruktionen',
        cart_empty_description: 'Voeg enkele geweldige Stahlkonstruktionen toe, om te beginnen!',
        cart_review_subtitle: 'Bekijk uw geselecteerde items en ga door naar veilige checkout',
        your_items: 'Ihre Artikel',
        clear_cart: 'Warenkorb leeren',
        each: 'je',
        remove: 'Entfernen',
        free_shipping: 'Kostenloser Versand',
        free_shipping_subtitle: 'Bei Bestellungen boven €500',
        quality_guarantee: 'Kwaliteitsgarantie',
        quality_guarantee_subtitle: 'Zertifizierte Materialien',
        fast_processing: 'Schnelle Bearbeitung',
        fast_processing_subtitle: '24-48 Stunden Bearbeitungszeit',
        browse_warehouses: 'Lagerhäuser durchsuchen',
        browse_products: 'Produkte durchsuchen',
        product: 'Product',
    },
    nl: {
        // Navigation
        home: 'Home',
        about_us: 'Over ons',
        shop: 'Winkel',
        services: 'Diensten',
        contact: 'Contact',
        contact_us: 'Neem contact op',
        cart: 'Winkelwagen',
        language: 'Taal',

        // Hero Section
        hero_title: 'Premium Tweedehands Industriële Gebouwen',
        hero_subtitle: 'Duurzame staalconstructies voor uw zakelijke behoeften. Kwaliteit gegarandeerd, milieuvriendelijk.',
        hero_engineering_title: 'Engineering',
        hero_tomorrows: 'van morgen',
        hero_infrastructure: 'Infrastructuur',
        hero_description: 'Levering van wereldklasse staalfabricage en bouwoplossingen met precisie en innovatie.',

        // Features - Hero Page
        precision_engineering: 'Precisie Engineering',
        precision_engineering_desc: 'Geavanceerde CAD/CAM-systemen zorgen voor millimeterprecieze fabricage',
        on_time_delivery: 'Tijdige Levering',
        on_time_delivery_desc: 'Rigoureus projectmanagement zorgt ervoor dat deadlines altijd worden gehaald',
        sustainable_solutions: 'Duurzame Oplossingen',
        sustainable_solutions_desc: 'Milieuvriendelijke processen en materialen voor een groenere toekomst',
        why_choose_title: 'Waarom kiezen voor',
        why_choose_resteel: 'Resteel Solutions?',
        why_choose_subtitle: 'Combinatie van expertise met geavanceerde technologie',

        // About Page
        about_hero_title: 'Staalconstructie herdefiniëren',
        about_hero_subtitle: 'Bij Resteel geven we tweedehands staalconstructies een krachtig tweede leven — met duurzaamheid, schaal en precisie.',
        who_we_are: 'Wie we zijn',
        our_mission: 'Onze missie',
        integrity: 'Integriteit',
        expertise: 'Expertise',
        innovation: 'Innovatie',
        what_we_offer: 'Wat we bieden',
        steel_halls: 'Staalhallen',
        assembly_services: 'Montageservice',
        project_guidance: 'Projectbegeleiding',
        certified_steel: 'Gecertificeerd staal',
        across_borders: 'Over grenzen heen',
        lets_build_sustainable: 'Laten we iets duurzaams bouwen',
        get_in_touch: 'Neem contact op',

        // Services
        services_we_provide: 'Diensten',
        we_provide: 'Die Wij Leveren',
        premium_resale: 'Premium Wederverkoop',
        premium_resale_desc: 'Toegang tot een brede selectie van gekeurd tweedehands staalgebouwen klaar voor nieuw gebruik.',
        assembly_disassembly: 'Montage & Demontage',
        assembly_disassembly_desc: 'Van volledige demontage tot locatie-inrichting, we beheren beide kanten van de levenscyclus.',
        transport_logistics: 'Transport & Logistiek',
        transport_logistics_desc: 'Internationaal transport door Europa met partnervloten en vrachtplanning.',
        equipment_tracking: 'Apparatuur Tracking',
        equipment_tracking_desc: 'Krijg zichtbaarheid, veiligheid en updates tijdens de verplaatsing van uw gebouw.',
        services_subtitle: 'Meer dan alleen kopen en verkopen — we helpen bij verplaatsen, beheren en optimaliseren van elke structuur',

        // Buildings
        featured: 'Uitgelicht',
        buildings: 'Gebouwen',
        warehouses: 'Magazijnen',
        halls: 'Hallen',
        other: 'Andere',
        commercial: 'Commercieel',
        industrial: 'Industrieel',
        featured_buildings_subtitle:
            'Ontdek onze samengestelde selectie van premium tweedehands gebouwen, klaar voor verplaatsing met expertprecisie.',
        view_all_buildings: 'Alle gebouwen bekijken',
        available_buildings: 'Beschikbare gebouwen',
        construction: 'Constructie',
        total_area: 'Totale oppervlakte',
        main_hall: 'Hoofdhal',
        office_space: 'Kantoorruimte',
        loading_dock: 'Laadperron',
        specifications: 'Specificaties',
        details: 'Details',
        view: 'Bekijken',
        more: 'meer',
        all: 'Alle',
        video: 'Video',
        sale: 'Verkoop',

        // WebShop
        webshop: 'Webshop',
        premium_structures: 'Premium Structuren',
        webshop_subtitle: 'Ontdek onze uitgebreide collectie hoogwaardige staalproducten voor al uw bouwbehoeften',
        all_products: 'Alle producten',
        search_products_placeholder: 'Zoek premium staalproducten...',
        no_products_found: 'Geen producten gevonden',
        search_criteria_no_match: 'We konden geen producten vinden die overeenkomen met uw zoekcriteria.',
        in_stock: 'Op voorraad',
        out_of_stock: 'Niet op voorraad',
        sold_out: 'Uitverkocht',
        add_to_cart_failed: 'Mislukt om artikel toe te voegen aan winkelwagen. Probeer het opnieuw.',
        contact_about_product: 'Contact over product',
        filters: 'Filters',
        categories: 'Categorieën',
        add_to_cart: 'Toevoegen aan winkelwagen',

        // WebShop Item Detail
        loading_product: 'Product laden...',
        loading_product_details: 'Productdetails laden...',
        product_not_found: 'Product niet gevonden',
        failed_to_load_product_details: 'Mislukt om productdetails te laden',
        back_to_products: 'Terug naar producten',
        request_information: 'Informatie aanvragen',
        watch_video: 'Video bekijken',
        key_features: 'Belangrijkste kenmerken',
        product_description: 'Productbeschrijving',
        all_features: 'Alle kenmerken',

        // Status & Common
        loading: 'Laden...',
        not_available: 'N/B',
        not_specified: 'Niet gespecificeerd',
        untitled: 'Zonder titel',
        unknown: 'Onbekend',
        uncategorized: 'Ongecategoriseerd',
        no_buildings_found: 'Geen gebouwen gevonden',
        check_back_later: 'Kom later terug voor nieuwe aanbiedingen',
        failed_to_load_buildings: 'Mislukt om gebouwen te laden',
        try_different_filter: 'Probeer een ander filter te selecteren',

        // FeaturesPreview Component
        why_choose_us: 'Waarom voor ons kiezen',
        why_choose_us_subtitle:
            'Wij combineren decennia van ervaring met een breed Europees netwerk om staalhandel snel, transparant en effectief te maken',
        europe_wide_reach: 'Europa-breed bereik',
        europe_wide_reach_desc: 'We adverteren uw aanbiedingen in meer dan 20 landen via ons netwerk van geverifieerde kopers en partners.',
        end_to_end_support: 'End-to-end ondersteuning',
        end_to_end_support_desc: 'We beheren de volledige levenscyclus — demontage, transport en hermontage inbegrepen.',
        years_of_trust: '20+ jaar vertrouwen',
        years_of_trust_desc:
            'Sinds 2000 hebben we honderden industriële en agrarische bedrijven geholpen bij het verplaatsen of doorverkopen van staalhallen.',

        // CarouselSection Component
        discover_our_latest_structures: 'Ontdek onze nieuwste structuren',
        latest_structures_subtitle: 'Nieuwe staalhallen, magazijnen en frames — klaar voor verplaatsing.',
        explore_all: 'Alles verkennen',

        // Testimonials Component
        what_our_clients_say: 'Wat onze klanten zeggen',
        real_results_subtitle: 'Echte resultaten van echte bedrijven in heel Europa en daarbuiten',

        // Contact Component
        expert_consultation: 'Expert consultatie',
        ready_to_build_great: 'Klaar om iets geweldigs te bouwen?',
        transform_vision_subtitle: 'Transformeer uw visie naar realiteit met onze precisie-engineering en decennia van expertise.',
        send_us_message: 'Stuur ons een bericht',
        respond_soon: 'We reageren zo snel mogelijk.',
        name_required: 'Naam *',
        email_required: 'E-mail *',
        message_required: 'Bericht *',
        sending: 'Verzenden...',
        email_inquiries: 'E-mail vragen',
        direct_consultation: 'Directe consultatie',
        visit_our_facility: 'Bezoek onze faciliteit',
        schedule_tour: 'Tour plannen',

        // NewsletterSection Component
        stay_updated_with: 'Blijf op de hoogte met',
        industry_insights: 'Branche-inzichten',
        newsletter_weekly_desc: 'Ontvang de nieuwste updates over staaloplossingen, trends en technische innovatie — wekelijks in uw inbox.',
        enter_your_email: 'Voer uw e-mail in',
        project_support_24_7: '24/7 projectondersteuning',
        satisfied_clients_500: '500+ tevreden klanten',
        weekly_updates: 'Wekelijkse updates',

        // Footer Component
        resteel_solutions: 'Resteel Solutions',
        footer_company_desc: 'Specialisten in het kopen en verkopen van tweedehands gebouwen en bouwmaterialen met meer dan 20 jaar ervaring.',
        engineering_excellence_since: 'Engineering Excellence sinds 1985.',

        // Building Details
        loading_property: 'Eigendom laden',
        loading_property_details: 'Eigendomsdetails laden',
        please_wait_while_we_fetch: 'Even geduld terwijl we de informatie ophalen...',
        property_not_found: 'Eigendom niet gevonden',
        property_not_found_description: 'Het eigendom dat u zoekt bestaat niet of is verwijderd.',
        back_to_properties: 'Terug naar eigendommen',
        back: 'Terug',
        built: 'Gebouwd',
        per_m2: 'per m²',
        contact_for_details: 'Contact voor details',
        contact_for_price: 'Contact voor prijs',
        no_description_available: 'Geen beschrijving beschikbaar.',
        warehouse: 'Warehouse',
        property_stats: 'Eigendomsstatistieken',
        property_type: 'Type eigendom',
        property_description: 'Eigendomsbeschrijving',
        construction_details: 'Constructiedetails',
        total_building_area: 'Totale gebouwoppervlakte',
        no_specifications_available: 'Geen specificaties beschikbaar',
        interested_title: 'Geïnteresseerd in dit eigendom?',
        interested_text: 'Neem contact op met ons team voor meer details en om een bezichtiging te plannen.',
        view_similar: 'Vergelijkbare eigendommen bekijken',
        view_all_features: 'Alle {{count}} kenmerken bekijken',
        watch_video_tour: 'Video-tour bekijken',

        // ContactForm
        contact_form_interested_in: 'Ik ben geïnteresseerd in {{product}}. Graag meer informatie.',
        contact_form_success_message: 'Bedankt! Uw aanvraag is succesvol verzonden. We nemen binnen 24 uur contact met u op.',
        contact_form_unexpected_response: 'Onverwacht antwoordformaat. Probeer het opnieuw.',
        contact_form_validation_error: 'Corrigeer de onderstaande fouten en probeer het opnieuw.',
        contact_form_csrf_error: 'Beveiligingstoken verlopen. Vernieuw de pagina en probeer het opnieuw.',
        contact_form_server_error: 'Serverfout opgetreden. Probeer het later opnieuw.',
        contact_form_network_error: 'Netwerkfout. Controleer uw verbinding en probeer het opnieuw.',
        contact_form_unexpected_error: 'Er is een onverwachte fout opgetreden. Probeer het opnieuw.',
        interested_in: 'Geïnteresseerd in',
        full_name: 'Volledige naam',
        enter_full_name: 'Voer uw volledige naam in',
        email_address: 'E-mailadres',
        email_placeholder: 'uw.email@bedrijf.com',
        phone_placeholder: '+31 (555) 123-4567',
        company: 'Bedrijf',
        company_placeholder: 'Uw bedrijfsnaam',
        inquiry_type: 'Type aanvraag',
        general_inquiry: 'Algemene aanvraag',
        existing_customer_support: 'Bestaande klantondersteuning',
        partnership_opportunity: 'Partnerschapsmogelijkheid',
        message: 'Bericht',
        message_placeholder: 'Vertel ons meer over uw vereisten of vragen...',
        sent_successfully: 'Succesvol verzonden!',
        send_inquiry: 'Aanvraag verzenden',
        contact_form_privacy_note: 'Door dit formulier in te dienen, gaat u akkoord met ons privacybeleid. We nemen binnen 24 uur contact met u op.',

        // WebShop Item Detail (additional)
        view_more_products: 'Meer producten bekijken',

        // Common
        browse_structures: 'Structuren bekijken',
        lets_work_together: 'Laten we samenwerken',
        terms: 'Voorwaarden',
        privacy: 'Privacy',

        // Hero2 Component
        hero2_title: 'Tweedehands staalconstructies kopen en verkopen in heel Europa',
        hero2_subtitle: 'Van agrarische hallen tot industriële magazijnen — vertrouwde verplaatsing en doorverkoop sinds 2000.',
        browse_structures_btn: 'Structuren bekijken',
        sell_your_property_btn: 'Uw eigendom verkopen',

        // Contact Copy Component (additional)
        send_message_btn: 'Bericht versturen',

        // Cart Component
        shopping: 'Winkelen',
        order_summary: 'Bestelsamenvatting',
        subtotal: 'Subtotaal',
        tax: 'Belasting',
        shipping: 'Verzending',
        total: 'Totaal',
        free: 'Gratis',
        proceed_to_checkout: 'Doorgaan naar checkout',
        cart_empty: 'Uw winkelwagen is leeg',
        cart_empty_subtitle: 'Begin met het bouwen van uw toekomst met onze premium staalconstructies',
        cart_empty_description: 'Voeg enkele geweldige staalconstructies toe, om te beginnen!',
        cart_review_subtitle: 'Bekijk uw geselecteerde items en ga door naar veilige checkout',
        your_items: 'Uw items',
        clear_cart: 'Winkelwagen legen',
        each: 'per stuk',
        remove: 'Verwijderen',
        free_shipping: 'Gratis verzending',
        free_shipping_subtitle: 'Bij bestellingen boven €500',
        quality_guarantee: 'Kwaliteitsgarantie',
        quality_guarantee_subtitle: 'Gecertificeerde materialen',
        fast_processing: 'Snelle verwerking',
        fast_processing_subtitle: '24-48 uur afhandeling',
        browse_warehouses: 'Magazijnen bekijken',
        browse_products: 'Producten bekijken',
        product: 'Product',
    },
};

// Build resources object with predefined translations + server translations
const resources: Record<string, any> = {};

// Add predefined translations for all supported languages
(supported_locales || ['en', 'de', 'nl']).forEach((lang: string) => {
    resources[lang] = {
        translation: predefinedTranslations[lang as keyof typeof predefinedTranslations] || predefinedTranslations.en,
    };
});

// Override current language with server translations if available
if (translations && locale) {
    // Extract messages from the translations object
    const serverMessages = translations.messages || {};

    resources[locale] = {
        translation: {
            ...resources[locale]?.translation,
            ...serverMessages,
        },
    };
}

// Initialize i18next with translations from Laravel
i18n.use(initReactI18next).init({
    resources,
    lng: locale || 'en',
    fallbackLng: fallback_locale || 'en',
    supportedLngs: supported_locales || ['en', 'de', 'nl'],
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
        format: function (value, format, lng) {
            if (format === 'uppercase') return value.toUpperCase();
            if (format === 'lowercase') return value.toLowerCase();
            return value;
        },
    },
    react: {
        useSuspense: false,
    },
    debug: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Missing translation key: ${key} for language: ${lng}`);
        }
        return fallbackValue || key;
    },
    keySeparator: false,
    nsSeparator: false,
});

export default i18n;

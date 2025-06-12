import ContactForm from './Form';

interface Props {
    contact: {
        id: number;
        name: string;
        email: string;
        phone: string;
        company: string;
        message: string;
        status: string;
        type: string;
        source: string;
        value: number | null;
    };
}

export default function Edit({ contact }: Props) {
    return <ContactForm contact={contact} isEditing={true} />;
} 
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | SmartsPicks',
    description: 'Get in touch with the SmartsPicks team. We\'re here to help with questions, suggestions, and feedback about our product recommendations.',
    keywords: 'contact SmartsPicks, customer support, product recommendations help, Amazon affiliate contact',
    alternates: {
        canonical: '/contact'
    },
    openGraph: {
        title: 'Contact Us | SmartsPicks',
        description: 'Get in touch with the SmartsPicks team. We\'re here to help with questions, suggestions, and feedback.',
        images: [
            {
                url: '/images/contact-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Contact SmartsPicks',
            }
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | SmartsPicks',
        description: 'Get in touch with the SmartsPicks team. We\'re here to help with questions, suggestions, and feedback.',
        images: ['/images/contact-hero.jpg'],
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
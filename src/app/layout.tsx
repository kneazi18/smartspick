import type {Metadata} from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import Script from 'next/script';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL('https://smartspicks.com'),
    title: 'SmartsPicks - The Best Amazon Products',
    description: 'Discover the best Amazon products with honest reviews and trusted recommendations. Save time and money with our expert selection.',
    keywords: 'Amazon, products, reviews, recommendations, shopping, deals, electronics, home, garden',
    authors: [{name: 'SmartsPicks Team'}],
    creator: 'SmartsPicks',
    alternates: {
        canonical: 'https://smartspicks.com/'
    },
    publisher: 'SmartsPicks',
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://smartspicks.com',
        siteName: 'SmartsPicks',
        title: 'SmartsPicks - The Best Amazon Products',
        description: 'Discover the best Amazon products with honest reviews and trusted recommendations.',
        images: [
            {
                url: '/images/hero-products.jpg',
                width: 1200,
                height: 630,
                alt: 'SmartsPicks - The Best Amazon Products',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SmartsPicks - The Best Amazon Products',
        description: 'Discover the best Amazon products with honest reviews and trusted recommendations.',
        images: ['/images/hero-products.jpg'],
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
        {/*<body className={`${inter.className} antialiased`}>*/}
        <body className={`antialiased`}>

        <div className="min-h-screen flex flex-col">
            <ErrorBoundary showErrorDetails={process.env.NODE_ENV === 'development'}>
                <Header/>
                <main className="flex-grow pt-[72px] md:pt-[130px]">
                    {children}
                </main>
                <Footer/>
            </ErrorBoundary>
        </div>

        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-JTWH300KE1"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-JTWH300KE1');
            `}
        </Script>
        </body>
        </html>
    );
}
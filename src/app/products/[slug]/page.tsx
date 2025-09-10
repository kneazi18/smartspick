import {notFound} from 'next/navigation';
import {Metadata} from 'next';
import Image from 'next/image';
import {products} from '../../../data/products';
import {Product} from '../../../types';
import StructuredData from '../../../components/StructuredData';
import {generateProductStructuredData, generateBreadcrumbStructuredData} from '../../../lib/structured-data';
import GoBackButton from '../../../components/ui/GoBackButton';

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
    const {slug} = await params;
    const product = products.find((p: Product) => p.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found - SmartsPicks',
            description: 'The requested product could not be found.'
        };
    }

    return {
        title: `${product.title} - SmartsPicks`,
        description: product.description,
        keywords: [product.title, product.category, 'review', 'product', 'amazon', 'buy'].join(', '),
        alternates: {
            canonical: `https://smartspicks.com/products/${slug}`
        },
        openGraph: {
            title: product.title,
            description: product.description,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 600,
                    alt: product.title,
                }
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description,
            images: [product.image],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function ProductPage({params}: ProductPageProps) {
    const {slug} = await params;
    const product = products.find((p: Product) => p.slug === slug);

    if (!product) {
        notFound();
    }

    // Generate structured data for SEO
    const productData = generateProductStructuredData(product);
    const breadcrumbData = generateBreadcrumbStructuredData([
        {name: 'Home', url: '/'},
        {name: 'Products', url: '/categories'},
        {name: product.category, url: `/categories/${product.category.toLowerCase()}`},
        {name: product.title, url: `/products/${product.slug}`}
    ]);

    return (
        <>
            <StructuredData data={[productData, breadcrumbData]}/>
            <div className="container-custom py-8">
                <GoBackButton className="mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={true}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {product.title}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {product.description}
                        </p>
                        {/*<div className="flex items-center space-x-4">*/}
                        {/*    <span className="text-3xl font-bold text-primary-600">*/}
                        {/*        ${product.price}*/}
                        {/*    </span>*/}
                        {/*    {product.originalPrice && product.originalPrice > 0 && (*/}
                        {/*        <span className="text-xl text-gray-500 line-through">*/}
                        {/*            ${product.originalPrice}*/}
                        {/*        </span>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                        {i < Math.floor(product.rating) ? '' : ''}
                                    </span>
                                ))}
                            </div>
                            <span className="text-gray-600">
                            ({product.reviewCount} reviews)
                        </span>
                        </div>
                        {product.features && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-primary-600 mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <a
                            href={product.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                        >
                            View on Amazon
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
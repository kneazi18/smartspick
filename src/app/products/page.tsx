import Image from 'next/image';
import { Metadata } from 'next';
import { products } from '../../data/products';
import { Product } from '../../types';
import CardProduct from '../../components/ui/CardProduct';
import StructuredData from '../../components/StructuredData';
import { generateOrganizationStructuredData, generateBreadcrumbStructuredData } from '../../lib/structured-data';

export const metadata: Metadata = {
    title: 'All Products - SmartsPicks',
    description: 'Browse all our carefully selected products with honest reviews and best deals.',
    alternates: {
        canonical: '/products'
    }
};

export default function ProductsPage() {
    // Generate structured data for SEO
    const organizationData = generateOrganizationStructuredData();
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', url: '/' },
        { name: 'All Products', url: '/products' }
    ]);

    return (
        <>
            <StructuredData data={[organizationData, breadcrumbData]} />
            
            {/* Header Section */}
            <section className="relative py-16 md:py-32 overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/hero-products.jpg"
                    alt="All Products SmartsPicks"
                    fill
                    className="absolute inset-0 object-cover"
                    priority
                />
                {/* Overlay for text readability */}
                {/*<div className="absolute inset-0 bg-black bg-opacity-40"></div>*/}

                <div className="container-custom relative z-10">
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Browse All Our
                                <span className="text-primary-600 block">Products</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                Browse our complete collection of carefully selected products with honest reviews and best deals.
                            </p>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600">{products.length}</div>
                                <div className="text-sm text-gray-600">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600">4.5★</div>
                                <div className="text-sm text-gray-600">Avg Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600">100%</div>
                                <div className="text-sm text-gray-600">Tested</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: Product) => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-6 6-6-6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No products available
                            </h3>
                            <p className="text-gray-600">
                                We're working on adding more products. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container-custom text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Use our search feature or browse by categories to find the perfect product for your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/search"
                                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                Search Products
                            </a>
                            <a
                                href="/categories"
                                className="inline-block bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Browse Categories
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
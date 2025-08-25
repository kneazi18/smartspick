import React from 'react';
import Image from 'next/image';
import { ExternalLink, Star, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import { products } from '../../data/products';

interface AffiliateProductProps {
    id: string;
    // Optional overrides - if provided, they override the product data
    title?: string;
    price?: number;
    image?: string;
    amazonUrl?: string;
    features?: string[];
    rating?: number;
    originalPrice?: number;
    // Banner mode props
    banner?: boolean;
    bannerTitle?: string;
    bannerDescription?: string;
    buttonText?: string;
    variant?: 'orange' | 'dark';
}

const AffiliateProduct: React.FC<AffiliateProductProps> = ({
    id,
    title: titleOverride,
    price: priceOverride,
    image: imageOverride,
    amazonUrl: amazonUrlOverride,
    features: featuresOverride,
    rating: ratingOverride,
    originalPrice,
    banner = false,
    bannerTitle,
    bannerDescription,
    buttonText = "Start FREE Trial Now →",
    variant = 'orange'
}) => {
    // Banner mode - simple promotional banner
    if (banner) {
        const isOrange = variant === 'orange';
        
        return (
            <div className={`my-8 p-6 rounded-xl text-center shadow-lg ${
                isOrange 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                    : 'bg-gray-900 border-2 border-orange-500'
            }`}>
                <h3 className={`text-xl font-bold mb-3 ${isOrange ? 'text-white' : 'text-orange-500'}`}>
                    {bannerTitle}
                </h3>
                <p className={`mb-4 text-base ${isOrange ? 'text-white' : 'text-white'}`}>
                    {bannerDescription}
                </p>
                <Button
                    href={amazonUrlOverride || "https://amazon.com/amazonprime"}
                    variant="primary"
                    className={`inline-block px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                        isOrange 
                            ? 'bg-white text-orange-600 hover:bg-gray-100' 
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                >
                    {buttonText}
                </Button>
            </div>
        );
    }

    // Find product in database
    const product = products.find(p => p.id === id);
    
    if (!product && !titleOverride) {
        console.warn(`Product with id "${id}" not found in products database`);
        return null;
    }
    
    // Use override values if provided, otherwise use product data
    const title = titleOverride || product?.title || 'Product Not Found';
    const price = priceOverride || product?.price || 0;
    const image = imageOverride || product?.image || '/images/placeholder.jpg';
    const amazonUrl = amazonUrlOverride || product?.amazonUrl || '#';
    const features = featuresOverride || product?.features || [];
    const rating = ratingOverride || product?.rating || 4.5;
    
    const discount = originalPrice && originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="my-8 p-6 border border-gray-200 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="lg:w-1/3">
                    <div className="relative aspect-square w-full max-w-xs mx-auto lg:mx-0">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                        />
                        {discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                                -{discount}%
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-3">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.floor(rating)
                                                ? 'text-yellow-400 fill-current'
                                                : i < rating
                                                ? 'text-yellow-400 fill-current opacity-50'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
                        </div>

                        {/* Features */}
                        <ul className="mb-4 space-y-1">
                            {features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <span className="text-sm text-gray-700 line-clamp-2">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price and CTA */}
                    <div>
                        {/*<div className="flex items-center gap-3 mb-4">*/}
                        {/*    <span className="text-2xl font-bold text-primary-600">*/}
                        {/*        ${price.toFixed(2)}*/}
                        {/*    </span>*/}
                        {/*    {originalPrice && originalPrice > 0 && (*/}
                        {/*        <span className="text-lg text-gray-500 line-through">*/}
                        {/*            ${originalPrice.toFixed(2)}*/}
                        {/*        </span>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                href={amazonUrl}
                                variant="primary"
                                className="flex items-center justify-center gap-2 flex-1"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                View on Amazon
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                                href={`/products/${product?.slug || id}`}
                                variant="outline"
                                className="flex-1"
                            >
                                View Details
                            </Button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                            *As an Amazon Associate, we earn from qualifying purchases
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateProduct;
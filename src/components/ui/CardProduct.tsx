import Image from 'next/image';
import Link from 'next/link';
import {Star, ShoppingCart} from 'lucide-react';
import {Product} from '../../types';
import Button from './Button';

interface CardProductProps {
    product: Product;
}

const CardProduct: React.FC<CardProductProps> = ({product}) => {
    const {
        title,
        description,
        image,
        // price,
        // originalPrice,
        rating,
        reviewCount,
        amazonUrl,
        badge
    } = product;

    // const formatPrice = (price: number) => {
    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD'
    //     }).format(price);
    // };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50"/>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300"/>
            );
        }

        return stars;
    };

    return (
        <div className="card overflow-hidden group">
            <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    {badge && (
                        <span
                            className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {badge}
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors whitespace-pre-wrap cursor-pointer">
                        {title}
                    </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {renderStars(rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        ({reviewCount.toLocaleString()})
                    </span>
                </div>

                {/*<div className="flex items-center justify-between mb-4">*/}
                {/*    <div className="flex items-center space-x-2">*/}
                {/*        <span className="text-2xl font-bold text-primary-600">*/}
                {/*            {formatPrice(price)}*/}
                {/*        </span>*/}
                {/*        {originalPrice && originalPrice > 0 && (*/}
                {/*            <span className="text-lg text-gray-500 line-through">*/}
                {/*                {formatPrice(originalPrice)}*/}
                {/*            </span>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*    {originalPrice && originalPrice > 0 && (*/}
                {/*        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">*/}
                {/*            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%*/}
                {/*        </span>*/}
                {/*    )}*/}
                {/*</div>*/}
                <Button
                    href={amazonUrl}
                    className="w-full"
                    variant="primary"
                >
                    <ShoppingCart className="w-4 h-4 mr-2"/>
                    View on Amazon
                </Button>
            </div>
        </div>
    );
};

export default CardProduct;
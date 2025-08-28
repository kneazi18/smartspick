'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/swiper.css';
import CardProduct from './ui/CardProduct';
import { Product } from '../types';

interface ProductsSwiperProps {
    products: Product[];
}

const ProductsSwiper: React.FC<ProductsSwiperProps> = ({ products }) => {
    return (
        <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            }}
            modules={[Autoplay, Pagination]}
            className="products-swiper"
        >
            {products.map((product: Product) => (
                <SwiperSlide key={product.id}>
                    <CardProduct product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductsSwiper;
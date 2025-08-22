'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { Category } from '../../types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

interface CategoryCarouselProps {
    categories: Category[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
    return (
        <div className="absolute inset-0">
            <Swiper
                className="mySwiper w-full h-full"
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                loop={true}
                allowTouchMove={false}
                speed={1000}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-full relative">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
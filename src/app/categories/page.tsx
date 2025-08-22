import Link from 'next/link';
import Image from 'next/image';
import {Metadata} from 'next';
import {ArrowRight} from 'lucide-react';
import {categories} from "../../data/categories";
import {products} from "../../data/products";
import {Category} from "../../types";
import CategoryCarousel from "../../components/ui/CategoryCarousel";
import React from "react";

export const metadata: Metadata = {
    title: 'All Categories - SmartsPicks',
    description: 'Explore all product categories available on SmartsPicks. Find the perfect products for your needs.',
    alternates: {
        canonical: '/categories'
    }
};

export default function CategoriesPage() {
    return (
        <>
            {/* Header Section */}
            <section
                className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-52 overflow-hidden">
                {/* Background Swiper */}
                <CategoryCarousel categories={categories} />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"/>

                <div className="container-custom relative z-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                            All Categories
                        </h1>
                        <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
                            Explore our complete range of categories and find the perfect products for every aspect of
                            your life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category: Category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group"
                            >
                                <div className="card overflow-hidden h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"/>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold text-xl mb-1">
                                                {category.name}
                                            </h3>
                                            {/*<p className="text-gray-200 text-sm">*/}
                                            {/*    {category.productCount} products available*/}
                                            {/*</p>*/}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {category.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-primary-600">
                                                {category.productCount} products
                                            </span>
                                            <div
                                                className="flex items-center text-primary-600 group-hover:text-primary-700 font-medium text-sm transition-colors">
                                                Explore
                                                <ArrowRight
                                                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            SmartsPicks in Numbers
                        </h2>
                        <p className="text-lg text-gray-600">
                            Statistics about the diversity and quality of our products
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">
                                {categories.length}
                            </div>
                            <div className="text-gray-600">Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">
                                {products.length}
                            </div>
                            <div className="text-gray-600">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">50k+</div>
                            <div className="text-gray-600">Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 mb-2">4.8★</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
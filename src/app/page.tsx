import Link from 'next/link';
import Image from 'next/image';
import { Star, TrendingUp, Shield, Clock, ArrowRight } from 'lucide-react';
import Button from "../components/ui/Button";
import {products} from "../data/products";
import {blogPosts} from "../data/blogPosts";
import {categories} from "../data/categories";
import {Product, BlogPost, Category} from "../types";
import dynamic from 'next/dynamic';
import { CategoryMenuSkeleton, BlogCardSkeleton } from "../components/ui/Skeletons";
import StructuredData from "../components/StructuredData";
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from "../lib/structured-data";


import ProductsSwiper from '../components/ProductsSwiper';

// Dynamic imports for components below the fold
const CategoryMenu = dynamic(() => import("../components/CategoryMenu"), {
    loading: () => <CategoryMenuSkeleton />
});
const BlogCard = dynamic(() => import("../components/BlogCard"), {
    loading: () => <BlogCardSkeleton />
});

export default function HomePage() {
    const featuredProducts: Product[] = products.slice(0, 12); // More products for Swiper
    const latestPosts: BlogPost[] = blogPosts
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3);
    const popularCategories: Category[] = categories.slice(0, 8);

    // Generate structured data for SEO
    const organizationData = generateOrganizationStructuredData();
    const websiteData = generateWebsiteStructuredData();

    return (
        <>
            <StructuredData data={[organizationData, websiteData]} />
            {/* Hero Section */}
            <section className="relative py-20">
                {/* Background Image */}
                <Image
                    src="/images/hero-products.jpg"
                    alt="Quality Amazon Products"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Overlay for better text readability */}
                {/*<div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 to-primary-100/90"></div>*/}
                
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Discover The Best
                                    <span className="text-primary-600 block">Products</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Save time and money with our honest reviews and trusted recommendations.
                                    We manually select the best products for you.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button href="/categories" size="lg" className="text-lg px-8 py-4">
                                    Explore Products
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button href="/blog" variant="outline" size="lg" className="text-lg px-8 py-4">
                                    Read Guides
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600">1000+</div>
                                    <div className="text-sm text-gray-600">Reviewed Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600">50k+</div>
                                    <div className="text-sm text-gray-600">Satisfied Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600">4.8★</div>
                                    <div className="text-sm text-gray-600">Average Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We offer you the best recommendations based on thorough research and real experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                                <Star className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Honest Reviews</h3>
                            <p className="text-gray-600">
                                We personally test products and provide transparent reviews, without paid opinions.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                                <TrendingUp className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Best Deals</h3>
                            <p className="text-gray-600">
                                We constantly monitor prices to always bring you the best deals.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                                <Shield className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Trusted Recommendations</h3>
                            <p className="text-gray-600">
                                Our selections are based on thorough research and real user feedback.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                                <Clock className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Save Time</h3>
                            <p className="text-gray-600">
                                No more wasting hours searching. Quickly find the perfect products for your needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Recommended Products
                            </h2>
                            <p className="text-lg text-gray-600">
                                Our selection of top products, tested and approved
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="hidden md:inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                        >
                            View all products
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </div>
                    <ProductsSwiper products={featuredProducts} />
                    <div className="text-center mt-8 md:hidden">
                        <Button href="/products" variant="primary">
                            View all products
                        </Button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <CategoryMenu categories={popularCategories} />

            {/* Latest Blog Posts */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Latest Articles
                            </h2>
                            <p className="text-lg text-gray-600">
                                Useful guides and tips to make the best choices
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden md:inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                        >
                            View all articles
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestPosts.map((post: BlogPost) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    <div className="text-center mt-8 md:hidden">
                        <Button href="/blog" variant="primary">
                            View all articles
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600">
                <div className="container-custom text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Join the SmartsPicks Community
                        </h2>
                        <p className="text-xl text-primary-100">
                            Get the best deals and product recommendations weekly directly in your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-900 bg-white placeholder:text-gray-500"
                            />
                            <Button
                                type="submit"
                                variant="secondary"
                                className="px-8 py-3 bg-white text-primary-600 hover:bg-gray-100 border-0"
                                aria-label="Subscribe to newsletter"
                            >
                                Subscribe
                            </Button>
                        </form>

                        <p className="text-sm text-primary-200">
                            Over 10,000 people already receive our weekly newsletter
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
'use client';

import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from "../../../components/ui/Button";
import CardProduct from "../../../components/ui/CardProduct";
import Pagination from "../../../components/Pagination";
import { Product, Category } from "../../../types";
import { categories } from "../../../data/categories";

interface CategoryPageClientProps {
    category: Category;
    products: Product[];
}

export default function CategoryPageClient({ category, products }: CategoryPageClientProps) {
    const [sortBy, setSortBy] = useState('popularity');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [minRating, setMinRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 12;

    // Apply filters and sorting
    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const priceInRange = product.price >= (priceRange[0] || 0) && product.price <= (priceRange[1] || 10000);
            const ratingAboveMin = product.rating >= minRating;
            return priceInRange && ratingAboveMin;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id.localeCompare(a.id);
                default: // popularity
                    return b.reviewCount - a.reviewCount;
            }
        });

        return filtered;
    }, [products, sortBy, priceRange, minRating]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Category Header */}
            <section className="relative bg-gradient-to-br py-16 md:py-52 overflow-hidden">
                {/* Background Image */}
                <Image
                    src={category.image || "/images/hero-products.jpg"}
                    alt={category.name}
                    fill
                    className="absolute inset-0 object-cover"
                    priority
                    unoptimized
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="container-custom relative z-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            {category.name}
                        </h1>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            {category.description}
                        </p>
                        <div className="inline-flex items-center space-x-2 bg-white bg-opacity-90 px-4 py-2 rounded-full shadow-sm">
                            <span className="text-sm text-gray-600">
                                {filteredProducts.length} products found
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="card p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Sort By */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort by
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="popularity">Popularity</option>
                                    <option value="price-low">Price: Low → High</option>
                                    <option value="price-high">Price: High → Low</option>
                                    <option value="rating">Rating</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price range
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        value={priceRange[1] || 10000}
                                        onChange={(e) => setPriceRange([priceRange[0] || 0, parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>${priceRange[0] || 0}</span>
                                        <span>${priceRange[1] || 10000}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Minimum rating
                                </label>
                                <select
                                    value={minRating}
                                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="0">All ratings</option>
                                    <option value="4">4+ stars</option>
                                    <option value="4.5">4.5+ stars</option>
                                </select>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Browse Categories
                                </label>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/categories/${cat.slug}`}
                                            className={`block p-3 rounded-lg border transition-colors 
                                            ${
                                                cat.id === category.id
                                                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                                                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <div className="text-sm font-medium">{cat.name}</div>
                                            {/*<div className="text-xs text-gray-500">{cat.productCount} products</div>*/}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Reset Filters */}
                            <Button
                                onClick={() => {
                                    setSortBy('popularity');
                                    setPriceRange([0, 10000]);
                                    setMinRating(0);
                                    setCurrentPage(1);
                                }}
                                variant="outline"
                                className="w-full"
                            >
                                Reset filters
                            </Button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <span>Filters</span>
                                </button>

                                <span className="text-sm text-gray-600">
                                    {filteredProducts.length} products
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {paginatedProducts.length > 0 ? (
                            <>
                                <div className={
                                    viewMode === 'grid'
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                        : "space-y-6"
                                }>
                                    {paginatedProducts.map((product) => (
                                        <CardProduct key={product.id} product={product} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting the filters to see more results.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSortBy('popularity');
                                        setPriceRange([0, 10000]);
                                        setMinRating(0);
                                        setCurrentPage(1);
                                    }}
                                    variant="primary"
                                >
                                    Reset filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
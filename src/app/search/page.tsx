'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, BookOpen, Grid } from 'lucide-react';
import { searchAll, SearchResult } from '../../lib/search';
import Button from '../../components/ui/Button';
import dynamic from 'next/dynamic';
import { CardProductSkeleton, BlogCardSkeleton } from '../../components/ui/Skeletons';

// Dynamic imports for better performance
const CardProduct = dynamic(() => import('../../components/ui/CardProduct'), {
    loading: () => <CardProductSkeleton />
});
const BlogCard = dynamic(() => import('../../components/BlogCard'), {
    loading: () => <BlogCardSkeleton />
});
import { products } from '../../data/products';
import { blogPosts } from '../../data/blogPosts';

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [filter, setFilter] = useState<'all' | 'products' | 'blog' | 'categories'>('all');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, [initialQuery]);

    const performSearch = (searchQuery: string) => {
        setIsLoading(true);
        
        // For now, use client-side search (includes static blog posts)
        // TODO: Implement server-side API search for MDX content
        setTimeout(() => {
            const searchResults = searchAll(searchQuery);
            setResults(searchResults);
            setIsLoading(false);
        }, 300);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            performSearch(query);
            // Update URL without navigation
            const url = new URL(window.location.href);
            url.searchParams.set('q', query);
            window.history.replaceState({}, '', url.toString());
        }
    };

    const filteredResults = filter === 'all' 
        ? results 
        : results.filter(result => {
            if (filter === 'categories') return result.type === 'category';
            if (filter === 'products') return result.type === 'product';
            if (filter === 'blog') return result.type === 'blog';
            return true;
        });

    const getResultCounts = () => {
        const productCount = results.filter(r => r.type === 'product').length;
        const blogCount = results.filter(r => r.type === 'blog').length;
        const categoryCount = results.filter(r => r.type === 'category').length;
        
        return { productCount, blogCount, categoryCount, total: results.length };
    };

    const counts = getResultCounts();

    const renderResult = (result: SearchResult, index: number) => {
        const uniqueKey = `${result.type}-${result.id}-${index}`;
        
        if (result.type === 'product') {
            const product = products.find(p => p.id === result.id);
            if (product) {
                return <CardProduct key={uniqueKey} product={product} />;
            }
        }
        
        if (result.type === 'blog') {
            const post = blogPosts.find(p => p.id === result.id);
            if (post) {
                return <BlogCard key={uniqueKey} post={post} />;
            }
        }
        
        if (result.type === 'category') {
            return (
                <Link
                    key={uniqueKey}
                    href={result.url}
                    className="card p-6 hover:shadow-lg transition-shadow group"
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <Grid className="w-8 h-8 text-primary-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {result.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {result.description}
                            </p>
                        </div>
                    </div>
                </Link>
            );
        }
        
        return null;
    };

    return (
        <div className="container-custom py-8">
            {/* Search Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Search Results
                </h1>
                
                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search products, articles, categories..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                            disabled={isLoading}
                        >
                            <Search className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </form>

                {/* Results Summary */}
                {query && (
                    <div className="mb-6">
                        <p className="text-gray-600">
                            {isLoading ? (
                                'Searching...'
                            ) : (
                                <>
                                    Found <span className="font-semibold">{filteredResults.length}</span> results 
                                    for "<span className="font-semibold">{query}</span>"
                                </>
                            )}
                        </p>
                    </div>
                )}
            </div>

            {/* Filters */}
            {results.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                filter === 'all'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All ({counts.total})
                        </button>
                        {counts.productCount > 0 && (
                            <button
                                onClick={() => setFilter('products')}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                                    filter === 'products'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>Products ({counts.productCount})</span>
                            </button>
                        )}
                        {counts.blogCount > 0 && (
                            <button
                                onClick={() => setFilter('blog')}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                                    filter === 'blog'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <BookOpen className="w-4 h-4" />
                                <span>Articles ({counts.blogCount})</span>
                            </button>
                        )}
                        {counts.categoryCount > 0 && (
                            <button
                                onClick={() => setFilter('categories')}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                                    filter === 'categories'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <Grid className="w-4 h-4" />
                                <span>Categories ({counts.categoryCount})</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Results */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Searching...</p>
                </div>
            ) : filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredResults.map((result, index) => renderResult(result, index))}
                </div>
            ) : query ? (
                <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No results found
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Try different keywords or browse our categories
                    </p>
                    <Button href="/categories" variant="primary">
                        Browse Categories
                    </Button>
                </div>
            ) : (
                <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Start your search
                    </h3>
                    <p className="text-gray-600">
                        Enter a keyword to search products, articles, and categories
                    </p>
                </div>
            )}
        </div>
    );
}

function SearchPageSkeleton() {
    return (
        <div className="container-custom py-8">
            <div className="mb-8">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded max-w-2xl mb-6 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageSkeleton />}>
            <SearchContent />
        </Suspense>
    );
}
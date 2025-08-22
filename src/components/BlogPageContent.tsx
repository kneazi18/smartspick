'use client';

import {Search, Filter} from 'lucide-react';
import {categories} from "../data/categories";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import {useEffect, useMemo, useState} from "react";

interface BlogPost {
    id?: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    publishedAt?: string;
    date?: string;
    readTime: number;
    tags: string[];
    category: string;
}

interface BlogPageContentProps {
    allPosts: BlogPost[];
}

export default function BlogPageContent({ allPosts }: BlogPageContentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    // Filter posts based on search query and category
    const filteredPosts = useMemo(() => {
        return allPosts.filter(post => {
            const matchesSearch = searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, allPosts]);

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    return (
        <div className="container-custom py-12">
            {/* Search and Filters */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400"/>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                            <option value="all">All categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mt-4 text-sm text-gray-600">
                    {filteredPosts.length === allPosts.length ? (
                        `Showing all ${allPosts.length} articles`
                    ) : (
                        `Showing ${filteredPosts.length} of ${allPosts.length} articles`
                    )}
                </div>
            </div>

            {/* Blog Posts */}
            {paginatedPosts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {paginatedPosts.map((post: any) => (
                            <BlogCard key={post.id || post.slug} post={post}/>
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
                <div className="text-center py-16">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No articles found
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Try searching with different terms or changing the selected category.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                        }}
                        className="btn-primary"
                    >
                        Reset search
                    </button>
                </div>
            )}
        </div>
    );
}
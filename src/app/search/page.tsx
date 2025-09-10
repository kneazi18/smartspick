import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SearchContent from './SearchContent';

export const metadata: Metadata = {
    title: 'Search - SmartsPicks',
    description: 'Search through our products, articles, and categories to find exactly what you\'re looking for.',
    alternates: {
        canonical: 'https://smartspicks.com/search'
    },
    robots: 'noindex, follow',
    openGraph: {
        title: 'Search - SmartsPicks',
        description: 'Search through our products, articles, and categories to find exactly what you\'re looking for.',
        type: 'website',
    },
};
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
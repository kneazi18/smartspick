// Loading skeleton components for better perceived performance

export function BlogCardSkeleton() {
    return (
        <article className="card overflow-hidden">
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            
            <div className="p-6 space-y-4">
                {/* Meta info skeleton */}
                <div className="flex items-center space-x-4">
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-14 animate-pulse"></div>
                </div>
                
                {/* Title skeleton */}
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                
                {/* Excerpt skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
                
                {/* Tags skeleton */}
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-12 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-14 animate-pulse"></div>
                </div>
                
                {/* Read more skeleton */}
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
        </article>
    );
}

export function CategoryMenuSkeleton() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container-custom">
                {/* Title skeleton */}
                <div className="text-center mb-12">
                    <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
                </div>
                
                {/* Categories grid skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="text-center group">
                            <div className="card p-6 hover:shadow-lg transition-shadow">
                                {/* Icon skeleton */}
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                                
                                {/* Category name skeleton */}
                                <div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                                
                                {/* Product count skeleton */}
                                <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View all button skeleton */}
                <div className="text-center mt-8">
                    <div className="h-12 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}

export function CardProductSkeleton() {
    return (
        <div className="card overflow-hidden">
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            
            <div className="p-4 space-y-3">
                {/* Title skeleton */}
                <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                
                {/* Description skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
                
                {/* Rating skeleton */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
                
                {/* Button skeleton */}
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
        </div>
    );
}

export function SearchResultsSkeleton() {
    return (
        <div className="container-custom py-8">
            {/* Header skeleton */}
            <div className="mb-8">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded max-w-2xl mb-6 animate-pulse"></div>
            </div>
            
            {/* Results grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <CardProductSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
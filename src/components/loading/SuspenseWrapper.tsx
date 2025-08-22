import { Suspense, ReactNode } from 'react';
import { SearchResultsSkeleton, CardProductSkeleton, BlogCardSkeleton } from '../ui/Skeletons';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  type?: 'search' | 'product' | 'blog' | 'generic';
  count?: number;
}

const getDefaultFallback = (type: string, count: number = 4) => {
  switch (type) {
    case 'search':
      return <SearchResultsSkeleton />;
    case 'product':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(count)].map((_, i) => (
            <CardProductSkeleton key={i} />
          ))}
        </div>
      );
    case 'blog':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(count)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      );
    case 'generic':
    default:
      return (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      );
  }
};

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback,
  type = 'generic',
  count = 4,
}) => {
  const defaultFallback = fallback || getDefaultFallback(type, count);

  return (
    <Suspense fallback={defaultFallback}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
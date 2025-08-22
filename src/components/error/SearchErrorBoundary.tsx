'use client';

import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import ErrorBoundary from '../ErrorBoundary';
import Button from '../ui/Button';

interface SearchErrorBoundaryProps {
  children: React.ReactNode;
  onRetry?: (() => void) | undefined;
}

const SearchErrorFallback = ({ onRetry }: { onRetry?: (() => void) | undefined }) => (
  <div className="text-center py-12">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Search temporarily unavailable
    </h3>
    <p className="text-gray-600 mb-6">
      We're having trouble processing your search. Please try again.
    </p>
    <Button onClick={onRetry || undefined} className="flex items-center justify-center mx-auto">
      <RefreshCw className="w-4 h-4 mr-2" />
      Try Again
    </Button>
  </div>
);

const SearchErrorBoundary: React.FC<SearchErrorBoundaryProps> = ({ 
  children, 
  onRetry 
}) => {
  return (
    <ErrorBoundary
      fallback={<SearchErrorFallback onRetry={onRetry} />}
      onError={(error, errorInfo) => {
        console.error('Search Error:', error, errorInfo);
        // Track search errors specifically
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default SearchErrorBoundary;
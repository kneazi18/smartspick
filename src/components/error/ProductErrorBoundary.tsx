'use client';

import React from 'react';
import { Package, RefreshCw, ArrowLeft } from 'lucide-react';
import ErrorBoundary from '../ErrorBoundary';
import Button from '../ui/Button';

interface ProductErrorBoundaryProps {
  children: React.ReactNode;
  productId?: string | undefined;
}

const ProductErrorFallback = ({ productId }: { productId?: string | undefined }) => (
  <div className="container-custom py-16">
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <Package className="w-10 h-10 text-red-600" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Product loading failed
        </h2>
        <p className="text-gray-600">
          We couldn't load the product details. This might be a temporary issue.
        </p>
        {productId && (
          <p className="text-sm text-gray-500">
            Product ID: {productId}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reload Product
        </Button>
        
        <Button
          href="/categories"
          variant="outline"
          className="flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse Products
        </Button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Having trouble?</h3>
        <p className="text-sm text-gray-600">
          Try refreshing the page or browse our other products while we fix this issue.
        </p>
      </div>
    </div>
  </div>
);

const ProductErrorBoundary: React.FC<ProductErrorBoundaryProps> = ({ 
  children, 
  productId 
}) => {
  return (
    <ErrorBoundary
      fallback={<ProductErrorFallback productId={productId} />}
      onError={(error, errorInfo) => {
        console.error('Product Error:', { error, errorInfo, productId });
        // Track product-specific errors
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ProductErrorBoundary;
'use client';

import { Home, Grid, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* 404 Number */}
                <div className="space-y-4">
                    <h1 className="text-8xl font-bold text-primary-600">404</h1>
                    <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved. 
                        Let's get you back on track!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/" size="lg" className="flex items-center justify-center">
                        <Home className="w-5 h-5 mr-2" />
                        Go Home
                    </Button>
                    <Button 
                        href="/categories" 
                        variant="outline" 
                        size="lg" 
                        className="flex items-center justify-center"
                    >
                        <Grid className="w-5 h-5 mr-2" />
                        Browse Categories
                    </Button>
                </div>

                {/* Back Link */}
                <div className="pt-4">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Go Back
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-16 h-16 bg-primary-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary-200 rounded-full opacity-20 animate-pulse"></div>
            </div>
        </div>
    );
}
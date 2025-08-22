'use client';

import {useEffect} from 'react';
import {AlertTriangle, RefreshCw, Home, Bug} from 'lucide-react';
import Button from '../components/ui/Button';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global error caught:', error);

        // Here you would typically send to your error tracking service
        // Example: Sentry.captureException(error);
    }, [error]);

    const handleReportError = () => {
        const errorReport = {
            message: error.message,
            stack: error.stack,
            digest: error.digest,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
        };

        // Copy error details to clipboard for easy reporting
        navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
            .then(() => alert('Error details copied to clipboard'))
            .catch(() => console.log('Could not copy to clipboard'));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-600"/>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Oops! Something went wrong
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        We encountered an unexpected error. Don't worry, our team has been automatically
                        notified and is working to fix the issue.
                    </p>
                </div>

                {/* Error details for development */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                        <h3 className="text-sm font-medium text-red-800 mb-2">
                            Development Error Details:
                        </h3>
                        <code className="text-xs text-red-700 block whitespace-pre-wrap break-all">
                            {error.message}
                        </code>
                        {error.digest && (
                            <p className="text-xs text-red-600 mt-2">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={reset}
                        className="flex items-center justify-center"
                    >
                        <RefreshCw className="w-5 h-5 mr-2"/>
                        Try Again
                    </Button>

                    <Button
                        href="/"
                        variant="outline"
                        className="flex items-center justify-center"
                    >
                        <Home className="w-5 h-5 mr-2"/>
                        Go Home
                    </Button>

                    {process.env.NODE_ENV === 'development' && (
                        <Button
                            onClick={handleReportError}
                            variant="outline"
                            className="flex items-center justify-center"
                        >
                            <Bug className="w-5 h-5 mr-2"/>
                            Copy Error Details
                        </Button>
                    )}
                </div>

                {/* Recovery suggestions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">
                        What you can try:
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1 text-left">
                        <li>• Refresh the page</li>
                        <li>• Check your internet connection</li>
                        <li>• Try again in a few minutes</li>
                        <li>• Clear your browser cache</li>
                    </ul>
                </div>

                {/* Contact support */}
                <p className="text-sm text-gray-500">
                    Still having trouble?{' '}
                    <a
                        href="/contact"
                        className="text-primary-600 hover:text-primary-700 underline font-medium"
                    >
                        Contact our support team
                    </a>
                </p>
            </div>
        </div>
    );
}
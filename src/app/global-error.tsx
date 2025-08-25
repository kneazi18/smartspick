'use client';

import {useEffect} from 'react';
import {AlertTriangle, RefreshCw} from 'lucide-react';

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the critical error
        console.error('Critical global error:', error);

        // Send to error tracking service immediately
        // This is a critical error that broke the entire app
    }, [error]);

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
                        Critical Error
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        The application encountered a critical error and needs to restart.
                        We apologize for the inconvenience.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        <RefreshCw className="w-5 h-5 mr-2"/>
                        Restart Application
                    </button>

                    <p className="text-sm text-gray-500">
                        If this problem persists, please refresh your browser or try again later.
                    </p>
                </div>

                {/* Emergency contact info */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800">
                        <strong>Emergency:</strong> If you continue experiencing issues,
                        please contact us immediately at{' '}
                        <a href="mailto:support@smartspicks.com" className="underline">
                            support@smartspicks.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
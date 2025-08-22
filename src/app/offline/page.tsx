'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Button from '../../components/ui/Button';


export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <WifiOff className="w-10 h-10 text-orange-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            You're offline
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            It looks like you've lost your internet connection. Please check your 
            network settings and try again.
          </p>
        </div>

        {/* Connection tips */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-left">
          <h3 className="font-medium text-orange-900 mb-2">
            Troubleshooting tips:
          </h3>
          <ul className="text-sm text-orange-800 space-y-1">
            <li>• Check your WiFi or mobile data connection</li>
            <li>• Make sure airplane mode is turned off</li>
            <li>• Try moving to an area with better signal</li>
            <li>• Restart your router if using WiFi</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          
          <Button
            href="/"
            variant="outline"
            className="flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>

        {/* Offline features notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">
            Limited offline access
          </h3>
          <p className="text-sm text-blue-800">
            Some cached content may still be available while you're offline. 
            Full functionality will return once you're back online.
          </p>
        </div>

        {/* Connection status indicator */}
        <div className="text-sm text-gray-500">
          <span className="inline-flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Connection status: Offline
          </span>
        </div>
      </div>
    </div>
  );
}
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Loading SmartsPicks
          </h2>
          <p className="text-gray-600">
            Getting the best products ready for you...
          </p>
        </div>
        
        {/* Loading bar animation */}
        <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
          <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}
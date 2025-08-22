'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GoBackButtonProps {
    className?: string;
}

export default function GoBackButton({ className = '' }: GoBackButtonProps) {
    const router = useRouter();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/products');
        }
    };

    return (
        <button
            onClick={handleGoBack}
            className={`inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
        </button>
    );
}
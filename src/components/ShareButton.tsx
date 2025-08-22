'use client';

import { Share2 } from 'lucide-react';
import Button from './ui/Button';

interface ShareButtonProps {
    post: {
        title: string;
        excerpt: string;
    };
    variant?: 'icon' | 'button';
    className?: string;
}

export default function ShareButton({ post, variant = 'icon', className = '' }: ShareButtonProps) {
    const handleShare = async () => {
        if (typeof window !== 'undefined') {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                    });
                } catch (error) {
                    console.log('Error sharing:', error);
                }
            } else {
                // Fallback to copying URL to clipboard
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link has been copied to clipboard!');
                } catch (error) {
                    console.log('Error copying to clipboard:', error);
                }
            }
        }
    };

    if (variant === 'button') {
        return (
            <Button onClick={handleShare} variant="outline" className={className}>
                <Share2 className="w-4 h-4 mr-1" />
                Share article
            </Button>
        );
    }

    return (
        <button
            onClick={handleShare}
            className={`inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors ${className}`}
        >
            <Share2 className="w-4 h-4 mr-1" />
            Share
        </button>
    );
}
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: (() => void) | undefined;
    href?: string | undefined;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           size = 'md',
                                           className = '',
                                           onClick,
                                           href,
                                           disabled = false,
                                           type = 'button'
                                       }) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-800 focus:ring-secondary-500',
        outline: 'border-2 border-primary-600 text-primary-600 hover:text-white hover:bg-primary-600 focus:ring-primary-500'
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    const finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

    if (href && !disabled) {
        // Check if the link is external (affiliate links should open in new tab)
        const isAmazonLink = href.includes('amazon.com') || href.includes('amzn.to');
        const isExternalLink = href.startsWith('http://') || href.startsWith('https://');
        const isRelativeLink = href.startsWith('/') || href.startsWith('#') || !href.includes('://');
        const shouldOpenInNewTab = isAmazonLink || (isExternalLink && !isRelativeLink);
        
        return (
            <a 
                href={href} 
                className={finalClasses} 
                target={shouldOpenInNewTab ? "_blank" : "_self"}
                rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={finalClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
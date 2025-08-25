interface PrimeBannerProps {
  variant?: 'orange' | 'dark';
  title: string;
  description: string;
  link: string;
  features?: string;
}

export default function PrimeBanner({ 
  variant = 'orange', 
  title, 
  description, 
  link,
  features 
}: PrimeBannerProps) {
  const isOrange = variant === 'orange';
  
  return (
    <div 
      className={`
        ${isOrange 
          ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
          : 'bg-gray-900 border-2 border-orange-500'
        } 
        p-6 rounded-xl text-center my-8 shadow-lg
      `}
    >
      <h3 className={`${isOrange ? 'text-white' : 'text-orange-500'} text-xl font-bold mb-2`}>
        {title}
      </h3>
      <p className={`${isOrange ? 'text-white' : 'text-white'} mb-4 text-base`}>
        {description}
      </p>
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-block px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105
          ${isOrange 
            ? 'bg-white text-orange-600 hover:bg-gray-100' 
            : 'bg-orange-500 text-white hover:bg-orange-600'
          }
        `}
      >
        Start FREE Trial Now →
      </a>
      {features && (
        <p className="text-gray-300 text-sm mt-3">
          {features}
        </p>
      )}
    </div>
  );
}
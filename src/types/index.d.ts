export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    amazonUrl: string;
    category: string;
    badge?: string;
    features?: string[];
    createdAt?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    publishedAt: string;
    readTime: number;
    tags: string[];
    category: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    productCount: number;
}

export interface NavigationItem {
    label: string;
    href: string;
    children?: NavigationItem[];
}
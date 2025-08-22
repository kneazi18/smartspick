import { products } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import { categories } from '../data/categories';
import { Product, BlogPost } from '../types';

export interface SearchResult {
    type: 'product' | 'blog' | 'category';
    id: string;
    title: string;
    description: string;
    url: string;
    image?: string;
    price?: number;
    category?: string;
}

// Client-side search function (for immediate results)
export function searchAll(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search products
    const productResults = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.features?.some(feature => feature.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm)
    ).map(product => ({
        type: 'product' as const,
        id: product.id,
        title: product.title,
        description: product.description,
        url: `/products/${product.id}`,
        image: product.image,
        price: product.price,
        category: product.category
    }));

    // Search blog posts (static only for client-side search)
    const blogResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
    ).map(post => ({
        type: 'blog' as const,
        id: post.id,
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
        image: post.image,
        category: post.category
    }));

    // Search categories
    const categoryResults = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm) ||
        category.description.toLowerCase().includes(searchTerm)
    ).map(category => ({
        type: 'category' as const,
        id: category.id,
        title: category.name,
        description: category.description,
        url: `/categories/${category.slug}`,
        image: category.image,
        category: category.slug
    }));

    // Combine and sort results (products first, then blogs, then categories)
    results.push(...productResults, ...blogResults, ...categoryResults);

    // Sort by relevance (exact matches first, then partial matches)
    return results.sort((a, b) => {
        const aExactMatch = a.title.toLowerCase() === searchTerm;
        const bExactMatch = b.title.toLowerCase() === searchTerm;
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        const aStartsWithMatch = a.title.toLowerCase().startsWith(searchTerm);
        const bStartsWithMatch = b.title.toLowerCase().startsWith(searchTerm);
        
        if (aStartsWithMatch && !bStartsWithMatch) return -1;
        if (!aStartsWithMatch && bStartsWithMatch) return 1;
        
        return 0;
    });
}

export function searchProducts(query: string): Product[] {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.features?.some(feature => feature.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

export function searchBlogPosts(query: string): BlogPost[] {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
    );
}
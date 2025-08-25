import { MetadataRoute } from 'next';
import { products } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import { categories } from '../data/categories';
import { getAllBlogPosts } from '../lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://smartspicks.com';
    const currentDate = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Product pages
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Blog post pages (static + MDX)
    const mdxPosts = getAllBlogPosts();
    const validMdxPosts = mdxPosts.filter((post): post is NonNullable<typeof post> => Boolean(post));
    const mdxSlugs = new Set(validMdxPosts.map(post => post.slug));
    const staticPostsToInclude = blogPosts.filter(post => !mdxSlugs.has(post.slug));
    
    const staticBlogPages: MetadataRoute.Sitemap = staticPostsToInclude.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));
    
    const mdxBlogPages: MetadataRoute.Sitemap = validMdxPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date((post as any).date || (post as any).publishedAt || currentDate),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));
    
    const blogPages = [...staticBlogPages, ...mdxBlogPages];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/categories/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...blogPages, ...categoryPages];
}
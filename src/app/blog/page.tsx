import Image from 'next/image';
import { Metadata } from 'next';
import {blogPosts} from "../../data/blogPosts";
import {getAllBlogPosts} from "../../lib/mdx";
import BlogPageContent from "../../components/BlogPageContent";

export const metadata: Metadata = {
    title: 'Blog - SmartsPicks',
    description: 'Useful guides, detailed reviews and tips to make the best shopping choices.',
    alternates: {
        canonical: 'https://smartspicks.com/blog'
    },
    openGraph: {
        title: 'Blog - SmartsPicks',
        description: 'Useful guides, detailed reviews and tips to make the best shopping choices.',
        images: [
            {
                url: '/images/blog/blog-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'SmartsPicks Blog',
            }
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog - SmartsPicks',
        description: 'Useful guides, detailed reviews and tips to make the best shopping choices.',
        images: ['/images/blog/blog-hero.jpg'],
    },
};

export default function BlogPage() {
    // Get MDX posts
    const mdxPosts = getAllBlogPosts();

    // Combine MDX posts with static posts, prioritizing MDX
    const validMdxPosts = mdxPosts.filter((post): post is NonNullable<typeof post> => Boolean(post));
    const mdxSlugs = new Set(validMdxPosts.map(post => post.slug));
    const staticPostsToInclude = blogPosts.filter(post => !mdxSlugs.has(post.slug));

    // Merge and sort all posts by date
    const allPosts = [...validMdxPosts, ...staticPostsToInclude].sort((a, b) => {
        const dateA = new Date((a as any).date || (a as any).publishedAt);
        const dateB = new Date((b as any).date || (b as any).publishedAt);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <>
            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-52 overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/blog/blog-hero.jpg"
                    alt="Blog SmartsPicks"
                    fill
                    className="absolute inset-0 object-cover"
                    priority
                    sizes="100vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"/>

                <div className="container-custom relative z-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Blog SmartsPicks
                        </h1>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            Useful guides, detailed reviews and tips to make the best shopping choices.
                        </p>
                    </div>
                </div>
            </section>

            <BlogPageContent allPosts={allPosts}/>
        </>
    );
};
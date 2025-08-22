import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, BookOpen } from 'lucide-react';
import Button from "../../../components/ui/Button";
import BlogCard from "../../../components/BlogCard";
import {blogPosts} from "../../../data/blogPosts";
import { getBlogPost } from "../../../lib/mdx";
import ShareButton from "../../../components/ShareButton";
import MDXRenderer from "../../../components/MDXRenderer";
import StructuredData from "../../../components/StructuredData";
import { generateArticleStructuredData, generateBreadcrumbStructuredData, generateProductRoundupStructuredData } from "../../../lib/structured-data";
import { products } from "../../../data/products";

interface BlogSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate dynamic metadata for blog posts
export async function generateMetadata({ params }: BlogSlugPageProps) {
    const { slug } = await params;
    const mdxPost = getBlogPost(slug);
    const post = mdxPost?.meta || blogPosts.find(p => p.slug === slug);

    if (!post) {
        return {
            title: 'Article Not Found - SmartsPicks',
            description: 'The requested article could not be found.'
        };
    }

    return {
        title: `${post.title} - SmartsPicks Blog`,
        description: post.excerpt,
        keywords: [...post.tags, post.category, 'guide', 'review', 'advice'].join(', '),
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            type: 'article',
            publishedTime: (post as any).publishedAt || (post as any).date,
            authors: [post.author],
            section: post.category,
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
    };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
    const { slug } = await params;
    
    // Try to load MDX content first
    const mdxPost = getBlogPost(slug);
    
    // Fallback to static blog posts if MDX not found
    const post = mdxPost?.meta || blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Get related posts (same category, exclude current post)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.slug !== slug)
        .slice(0, 3);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Generate structured data for SEO - convert to BlogPost format
    const blogPostData = {
        ...post,
        id: post.slug || 'unknown',
        publishedAt: (post as any).publishedAt || (post as any).date
    };
    const articleData = generateArticleStructuredData(blogPostData);
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` }
    ]);

    // For product roundup articles, add additional structured data
    const structuredDataArray = [articleData, breadcrumbData];
    
    // Check if this is a product roundup article (like Top 5 IEMs)
    if (post.title.toLowerCase().includes('top') && (post.title.toLowerCase().includes('iem') || post.title.toLowerCase().includes('product'))) {
        // Find relevant products for IEM article
        const iemProducts = products.filter(p => 
            p.title.toLowerCase().includes('iem') || 
            p.title.toLowerCase().includes('truthear') || 
            p.title.toLowerCase().includes('moondrop') ||
            p.title.toLowerCase().includes('meze') ||
            p.title.toLowerCase().includes('oriveti')
        );
        
        if (iemProducts.length > 0) {
            const roundupData = generateProductRoundupStructuredData(post.title, iemProducts);
            structuredDataArray.push(roundupData as any);
        }
    }

    return (
        <>
            <StructuredData data={structuredDataArray} />
            {/* Breadcrumb and Back Button */}
            <div className="bg-gray-50 py-4">
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to blog
                        </Link>

                        <ShareButton post={post} variant="icon" />
                    </div>
                </div>
            </div>

            {/* Article Header */}
            <article className="py-12">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Article Meta */}
                        <div className="flex items-center space-x-3 md:space-x-6 text-xs md:text-sm text-gray-500 mb-6">
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate((post as any).publishedAt || (post as any).date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime} min read</span>
                            </div>
                            <div className="hidden sm:flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span className="capitalize">{post.category}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Featured Image */}
                        <div className="mb-10">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map((tag: any, index: number) => (
                                <span key={index}
                                      className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            {mdxPost?.content ? (
                                // Render MDX content with proper compilation
                                <MDXRenderer content={mdxPost.content} />
                            ) : (
                                // Fallback content for static posts
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-6">
                                        This is the main content of the article. In a real implementation,
                                        this would be retrieved from a content management system (CMS)
                                        or from a Markdown file.
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                                        Main Benefits
                                    </h2>

                                    <p className="mb-6">
                                        For a complete implementation, here would be the detailed content of the article,
                                        with sections, lists, images and other content elements.
                                    </p>

                                    <ul className="list-disc list-inside mb-6 space-y-2">
                                        <li>First important benefit</li>
                                        <li>Second significant advantage</li>
                                        <li>Third key point</li>
                                    </ul>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                                        Conclusion
                                    </h2>

                                    <p className="mb-6">
                                        The article's conclusion would summarize the main points and offer
                                        final recommendations for readers.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Article Footer */}
                        <div className="border-t border-gray-200 pt-8 mt-12">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 sm:space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{post.author}</div>
                                        <div className="text-xs sm:text-sm text-gray-600">SmartsPicks Author</div>
                                    </div>
                                </div>

                                <ShareButton post={post} variant="button" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                Similar Articles
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost: any) => (
                                    <BlogCard key={relatedPost.id} post={relatedPost} />
                                ))}
                            </div>

                            <div className="text-center mt-8">
                                <Button href="/blog" variant="primary">
                                    View all articles
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
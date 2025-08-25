import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPostMeta {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
    category?: string;
    tags: string[];
    readTime: number;
    publishedAt?: string;
    id?: string;
}

export function getBlogPost(slug: string) {
    try {
        const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`);
        
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Clean up content to prevent memory leaks
        const cleanContent = content.trim();

        return {
            meta: {
                ...data,
                slug: slug
            } as BlogPostMeta,
            content: cleanContent,
        };
    } catch (error) {
        console.error('Error reading MDX file:', error);
        return null;
    }
}

export function getAllBlogSlugs() {
    try {
        const blogDirectory = path.join(contentDirectory, 'blog');
        
        if (!fs.existsSync(blogDirectory)) {
            return [];
        }

        const files = fs.readdirSync(blogDirectory);
        return files
            .filter(file => file.endsWith('.mdx'))
            .map(file => file.replace('.mdx', ''));
    } catch (error) {
        console.error('Error reading blog directory:', error);
        return [];
    }
}

export function getAllBlogPosts() {
    try {
        const slugs = getAllBlogSlugs();
        const posts = slugs.map((slug) => {
            const post = getBlogPost(slug);
            return post ? { ...post.meta, slug } : null;
        });

        return posts
            .filter(Boolean)
            .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime());
    } catch (error) {
        console.error('Error getting all blog posts:', error);
        return [];
    }
}
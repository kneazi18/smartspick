import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import {BlogPost} from "../types";

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const {
        slug,
        title,
        excerpt,
        image,
        author,
        publishedAt,
        readTime,
        tags,
        category
    } = post;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <article className="card overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
                <Link href={`/blog/${slug}`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                </Link>
                <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className='text-xs'>{formatDate(publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className='text-xs'>{readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className='text-xs'>{author}</span>
                    </div>
                </div>

                <Link href={`/blog/${slug}`}>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                        {title}
                    </h3>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.slice(0, 3).map((tag: string, index: number) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group/link transition-colors"
                >
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
import { MDXComponents } from 'mdx/types';
import { ImgHTMLAttributes } from 'react';
import AffiliateProduct from './AffiliateProduct';
import Image from 'next/image';

export const mdxComponents: MDXComponents = {
    AffiliateProduct,
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
        <Image
            src={props.src || ''}
            width={800}
            height={400}
            className="rounded-lg my-6 w-full h-auto"
            alt={props.alt || ''}
        />
    ),
    h1: (props: any) => (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
    ),
    p: (props: any) => (
        <p className="text-gray-700 leading-relaxed mb-4" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />
    ),
    li: (props: any) => (
        <li className="text-gray-700" {...props} />
    ),
    strong: (props: any) => (
        <strong className="font-semibold text-gray-900" {...props} />
    ),
    em: (props: any) => (
        <em className="italic text-gray-800" {...props} />
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700 my-6" {...props} />
    ),
    code: (props: any) => (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto" {...props} />
    ),
};
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {products} from "../../../data/products";
import {categories} from "../../../data/categories";
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = categories.find(cat => cat.slug === categorySlug);

    if (!category) {
        return {
            title: 'Category Not Found - SmartsPicks'
        };
    }

    return {
        title: `${category.name} - SmartsPicks`,
        description: category.description,
        alternates: {
            canonical: `/categories/${categorySlug}`
        }
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;

    // Find category
    const category = categories.find(cat => cat.slug === categorySlug);

    if (!category) {
        notFound();
    }

    // Filter products by category
    const categoryProducts = products.filter(product => product.category === category.slug);

    return (
        <CategoryPageClient 
            category={category}
            products={categoryProducts}
        />
    );
}
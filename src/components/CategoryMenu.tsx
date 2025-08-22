import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {Category} from "../types";

interface CategoryMenuProps {
    categories: Category[];
    title?: string;
    showViewAll?: boolean;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
                                                       categories,
                                                       title = "Explore Categories",
                                                       showViewAll = true
                                                   }) => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                    {showViewAll && (
                        <Link
                            href="/categories"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group transition-colors"
                        >
                            View all categories
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group"
                        >
                            <div className="card overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                                        <div className="p-4 w-full">
                                            <h3 className="text-white font-bold text-lg mb-1">
                                                {category.name}
                                            </h3>
                                            {/*<p className="text-gray-200 text-sm">*/}
                                            {/*    {category.productCount} products*/}
                                            {/*</p>*/}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {category.description}
                                    </p>

                                    <div className="mt-3 flex items-center text-primary-600 group-hover:text-primary-700 font-medium text-sm transition-colors">
                                        Explore category
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryMenu;
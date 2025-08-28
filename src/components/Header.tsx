"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, ShoppingBag } from 'lucide-react';
import {categories} from "../data/categories";

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false); // Close mobile menu if open
        }
    };


    return (
        <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
            <div className="container-custom">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <ShoppingBag className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-gray-900">
                            Smarts
                            <span className="text-primary-600">
                                Picks
                            </span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
                                aria-label="Search products"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:block border-t border-gray-200">
                    <ul className="flex items-center space-x-8 py-4">
                        <li>
                            {pathname === '/' ? (
                                <span className="text-primary-600 font-medium cursor-default">
                                    Home
                                </span>
                            ) : (
                                <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Home
                                </Link>
                            )}
                        </li>
                        <li>
                            {pathname === '/products' ? (
                                <span className="text-primary-600 font-medium cursor-default">
                                    All Products
                                </span>
                            ) : (
                                <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    All Products
                                </Link>
                            )}
                        </li>
                        <li className="relative group">
                            {pathname === '/categories' ? (
                                <span className="text-primary-600 font-medium cursor-default">
                                    Categories
                                </span>
                            ) : (
                                <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Categories
                                </Link>
                            )}
                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-2">
                                    {categories.slice(0, 6).map((category) => {
                                        const isActive = pathname === `/categories/${category.slug}`;
                                        return isActive ? (
                                            <span
                                                key={category.id}
                                                className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50"
                                            >
                                                {category.name}
                                            </span>
                                        ) : (
                                            <Link
                                                key={category.id}
                                                href={`/categories/${category.slug}`}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            >
                                                {category.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </li>
                        <li>
                            {pathname === '/blog' ? (
                                <span className="text-primary-600 font-medium cursor-default">
                                    Blog
                                </span>
                            ) : (
                                <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Blog
                                </Link>
                            )}
                        </li>
                        <li>
                            {pathname === '/about' ? (
                                <span className="text-primary-600 font-medium cursor-default">
                                    About Us
                                </span>
                            ) : (
                                <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    About Us
                                </Link>
                            )}
                        </li>
                        <li>
                            {pathname === '/contact' ? (
                                <span className="text-primary-600 font-medium cursor-default">
                                    Contact
                                </span>
                            ) : (
                                <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                    Contact
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    aria-label="Search products"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>

                        {/* Mobile Navigation */}
                        <nav className="py-4">
                            <ul className="space-y-2">
                                <li>
                                    {pathname === '/' ? (
                                        <span className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50">
                                            Home
                                        </span>
                                    ) : (
                                        <Link
                                            href="/"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Home
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    {pathname === '/products' ? (
                                        <span className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50">
                                            All Products
                                        </span>
                                    ) : (
                                        <Link
                                            href="/products"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            All Products
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    {pathname === '/categories' ? (
                                        <span className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50">
                                            Categories
                                        </span>
                                    ) : (
                                        <Link
                                            href="/categories"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Categories
                                        </Link>
                                    )}
                                </li>
                                {categories.slice(0, 4).map((category) => {
                                    const isActive = pathname === `/categories/${category.slug}`;
                                    return (
                                        <li key={category.id}>
                                            {isActive ? (
                                                <span className="block px-8 py-2 text-sm text-primary-600 font-medium cursor-default bg-primary-50">
                                                    {category.name}
                                                </span>
                                            ) : (
                                                <Link
                                                    href={`/categories/${category.slug}`}
                                                    className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {category.name}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                                <li>
                                    {pathname === '/blog' ? (
                                        <span className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50">
                                            Blog
                                        </span>
                                    ) : (
                                        <Link
                                            href="/blog"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Blog
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    {pathname === '/about' ? (
                                        <span className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50">
                                            About Us
                                        </span>
                                    ) : (
                                        <Link
                                            href="/about"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            About Us
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    {pathname === '/contact' ? (
                                        <span className="block px-4 py-2 text-primary-600 font-medium cursor-default bg-primary-50">
                                            Contact
                                        </span>
                                    ) : (
                                        <Link
                                            href="/contact"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Contact
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
"use client"

import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ShoppingBag, Mail} from 'lucide-react';
import {categories} from "../data/categories";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    return (
        <footer className="bg-secondary-900 text-white">
            <div className="container-custom">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <ShoppingBag className="w-8 h-8 text-primary-500"/>
                            <span className="text-2xl font-bold">
                                Smarts<span className="text-primary-500">Picks</span>
              </span>
                        </Link>
                        <p className="text-secondary-300 text-sm leading-relaxed">
                            Discover the best Amazon products with honest reviews and trusted recommendations.
                            Save time and money with our expert selection.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                {pathname === '/' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        Home
                                    </span>
                                ) : (
                                    <Link href="/"
                                          className="text-secondary-300 hover:text-primary-500 transition-colors text-sm">
                                        Home
                                    </Link>
                                )}
                            </li>
                            <li>
                                {pathname === '/products' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        All Products
                                    </span>
                                ) : (
                                    <Link href="/products"
                                          className="text-secondary-300 hover:text-primary-500 transition-colors text-sm">
                                        All Products
                                    </Link>
                                )}
                            </li>
                            <li>
                                {pathname === '/categories' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        All Categories
                                    </span>
                                ) : (
                                    <Link href="/categories"
                                          className="text-secondary-300 hover:text-primary-500 transition-colors text-sm">
                                        All Categories
                                    </Link>
                                )}
                            </li>
                            <li>
                                {pathname === '/blog' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        Blog
                                    </span>
                                ) : (
                                    <Link href="/blog"
                                          className="text-secondary-300 hover:text-primary-500 transition-colors text-sm">
                                        Blog
                                    </Link>
                                )}
                            </li>
                            <li>
                                {pathname === '/about' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        About Us
                                    </span>
                                ) : (
                                    <Link href="/about"
                                          className="text-secondary-300 hover:text-primary-500 transition-colors text-sm">
                                        About Us
                                    </Link>
                                )}
                            </li>
                            <li>
                                {pathname === '/contact' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        Contact
                                    </span>
                                ) : (
                                    <Link href="/contact"
                                          className="text-secondary-300 hover:text-primary-500 transition-colors text-sm">
                                        Contact
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">All Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((category) => {
                                const isActive = pathname === `/categories/${category.slug}`;
                                return (
                                    <li key={category.id}>
                                        {isActive ? (
                                            <span className="text-primary-500 font-medium cursor-default text-sm">
                                                {category.name}
                                            </span>
                                        ) : (
                                            <Link
                                                href={`/categories/${category.slug}`}
                                                className="text-secondary-300 hover:text-primary-500 transition-colors text-sm"
                                            >
                                                {category.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-primary-500"/>
                                <span className="text-secondary-300 text-sm">
                                    smartspicks@gmail.com
                                </span>
                            </div>
                            {/*<div className="flex items-center space-x-3">*/}
                            {/*    <Phone className="w-4 h-4 text-primary-500" />*/}
                            {/*    <span className="text-secondary-300 text-sm">+1 555 123 456</span>*/}
                            {/*</div>*/}
                            {/*<div className="flex items-center space-x-3">*/}
                            {/*    <MapPin className="w-4 h-4 text-primary-500" />*/}
                            {/*    <span className="text-secondary-300 text-sm">New York, USA</span>*/}
                            {/*</div>*/}
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="font-medium mb-2">Newsletter</h4>
                            <p className="text-secondary-400 text-xs mb-3">
                                Receive exclusive offers in your inbox
                            </p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors text-sm font-medium"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-secondary-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-secondary-400 text-sm">
                                © {currentYear} SmartsPicks. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                                {pathname === '/privacy-policy' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        Privacy Policy
                                    </span>
                                ) : (
                                    <Link href="/privacy-policy"
                                          className="text-secondary-400 hover:text-primary-500 text-sm transition-colors">
                                        Privacy Policy
                                    </Link>
                                )}
                                {pathname === '/terms' ? (
                                    <span className="text-primary-500 font-medium cursor-default text-sm">
                                        Terms and Conditions
                                    </span>
                                ) : (
                                    <Link href="/terms"
                                          className="text-secondary-400 hover:text-primary-500 text-sm transition-colors">
                                        Terms and Conditions
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Amazon Disclaimer */}
                        <div className="text-center md:text-right">
                            <p className="text-secondary-500 text-xs leading-relaxed max-w-md">
                                SmartsPicks.com is a participant in the Amazon Services LLC Associates Program,
                                an affiliate advertising program designed to provide a means for sites to earn
                                advertising fees
                                by advertising and linking to Amazon.com.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
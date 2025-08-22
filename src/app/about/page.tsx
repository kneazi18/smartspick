import { Heart, Target, Users, Award } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import Button from "../../components/ui/Button";

export const metadata: Metadata = {
    title: 'About Us - SmartsPicks',
    description: 'Learn more about the SmartsPicks team and our mission to help you find the best products on Amazon.',
    alternates: {
        canonical: '/about'
    }
};

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: 'Passion for Quality',
            description: 'We are passionate about finding and recommending only the highest quality products for our community.'
        },
        {
            icon: Target,
            title: 'Complete Transparency',
            description: 'We provide honest and transparent reviews without external influences. Our credibility is our number one priority.'
        },
        {
            icon: Users,
            title: 'Strong Community',
            description: 'We build a community of smart shoppers who help each other make wise purchasing decisions.'
        },
        {
            icon: Award,
            title: 'Verified Expertise',
            description: 'Our team of experts personally tests products to provide you with the most accurate recommendations.'
        }
    ];

    const stats = [
        { number: '50,000+', label: 'Active Users' },
        { number: '1,000+', label: 'Products Reviewed' },
        { number: '4.8★', label: 'Community Rating' },
        { number: '95%', label: 'Customer Satisfaction' }
    ];

    const teamMembers = [
        {
            name: 'Anatolie Furtuna',
            role: 'Founder & CEO',
            description: 'Technology enthusiast with over 10 years of experience in e-commerce and digital marketing.',
            image: '/images/team-alex.jpg'
        },
        {
            name: 'Cristina Arhip',
            role: 'Chief Editor',
            description: 'Content expert specializing in product reviews and consumer journalism.',
            image: '/images/team-maria.jpg'
        },
        {
            name: 'Robert George',
            role: 'Product Specialist',
            description: 'Market analyst focused on consumer trends and product quality evaluation.',
            image: '/images/team-radu.jpg'
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br py-20 md:py-52 overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/aboutUs-hero.jpg"
                    alt="About SmartsPicks"
                    fill
                    className="absolute inset-0 object-cover"
                    priority
                    unoptimized
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            About SmartsPicks
                        </h1>
                        <p className="text-xl text-white leading-relaxed">
                            We are a passionate team dedicated to helping you find the best products on Amazon.
                            Our mission is to save you time and money through honest recommendations and detailed reviews.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    SmartsPicks began from the desire to simplify the online shopping process.
                                    Our founder, Alex, realized he was spending countless hours searching for the right
                                    products on Amazon, reading hundreds of reviews and comparing specifications.
                                </p>
                                <p>
                                    In 2022, we decided to create a platform that would centralize this research
                                    and provide curated recommendations based on real testing and detailed analysis.
                                    Since then, we have helped tens of thousands of people make better choices.
                                </p>
                                <p>
                                    Today, SmartsPicks is more than just a review site - it's a community
                                    of smart shoppers who share their experiences and help each other
                                    find the perfect products.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/images/about/about-story.jpg"
                                alt="SmartsPicks team at work"
                                className="w-full rounded-2xl shadow-lg"
                            />
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-60"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide us in our mission to provide you with the best product recommendations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-primary-600">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            SmartsPicks by the Numbers
                        </h2>
                        <p className="text-xl text-primary-100">
                            Our impact in the online shopping community
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-primary-100">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The passionate people behind SmartsPicks recommendations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="card text-center p-6">
                                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-12 h-12 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-primary-600 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Evaluation Process
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            How we select and test products to provide you with the best recommendations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Market Research
                            </h3>
                            <p className="text-gray-600 text-sm">
                                We analyze trends and identify products with high potential
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Hands-on Testing
                            </h3>
                            <p className="text-gray-600 text-sm">
                                We purchase and personally test products under real conditions
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Detailed Analysis
                            </h3>
                            <p className="text-gray-600 text-sm">
                                We evaluate quality, functionality, and value for money
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                                4
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Honest Review
                            </h3>
                            <p className="text-gray-600 text-sm">
                                We publish transparent reviews with pros and cons for each product
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600">
                <div className="container-custom text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Join the SmartsPicks Community
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Be the first to know about the best deals and product recommendations
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/categories" variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                                Explore Products
                            </Button>
                            <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
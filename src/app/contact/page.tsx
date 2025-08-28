'use client';

import { Mail, Send, Clock } from 'lucide-react';
import Image from 'next/image';
import {useState} from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '' // Hidden field for bot detection
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                // Reset form after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
                }, 3000);
            } else {
                const errorData = await response.json();
                console.error('Failed to send email:', response.status, errorData);
                
                let errorMessage = 'Failed to send message. Please try again.';
                
                if (response.status === 429) {
                    errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
                } else if (response.status === 400) {
                    errorMessage = 'Please check your input and try again.';
                } else if (response.status === 403) {
                    errorMessage = 'Your message was blocked. Please contact us directly.';
                }
                
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }

        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'smartspicks@gmail.com',
            description: 'We respond within 24 hours'
        },
        // {
        //     icon: Phone,
        //     title: 'Phone',
        //     value: '+40 721 123 456',
        //     description: 'Monday - Friday, 09:00 - 18:00'
        // },
        // {
        //     icon: MapPin,
        //     title: 'Location',
        //     value: 'Bucharest, Romania',
        //     description: 'Kiseleff Boulevard, no. 32'
        // }
    ];

    const faqItems = [
        {
            question: 'How do you select recommended products?',
            answer: 'Our process includes market research, hands-on testing, and detailed analysis of each product before recommending it.'
        },
        {
            question: 'How do you make money from recommendations?',
            answer: 'We are participants in the Amazon Affiliate Program. If you purchase through our links, we receive a small commission at no extra cost to you.'
        },
        {
            question: 'Can I suggest a product for review?',
            answer: 'Absolutely! You can contact us with product suggestions. We evaluate all proposals and include products that meet our standards in our list.'
        },
        {
            question: 'Do you offer warranty for recommended products?',
            answer: 'We do not offer direct warranty, but all recommended products come with the manufacturer\'s warranty and Amazon\'s return policy.'
        }
    ];

    return (
        <>
            {/* Header Section */}
            <section className="relative bg-[#173050] py-20 md:py-52 overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/contact-hero.jpg"
                    alt="Contact Us"
                    fill
                    className="absolute inset-0 object-cover"
                    priority
                    unoptimized
                />
                {/* Overlay for text readability */}
                {/*<div className="absolute inset-0 bg-black bg-opacity-40"></div>*/}

                <div className="container-custom relative z-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Contact Us
                        </h1>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            Have questions, suggestions, or feedback? We're here to help!
                            The SmartsPicks team is happy to assist you.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <div className="card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send Us a Message
                            </h2>

                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                        <Send className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Message Sent Successfully!
                                    </h3>
                                    <p className="text-gray-600">
                                        Thank you for your message. We will respond as soon as possible.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Enter your email address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Subject of your message"
                                        />
                                    </div>

                                    {/* Honeypot field - hidden from users but visible to bots */}
                                    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, visibility: 'hidden' }}>
                                        <label htmlFor="honeypot">Leave this field empty</label>
                                        <input
                                            type="text"
                                            id="honeypot"
                                            name="honeypot"
                                            value={formData.honeypot}
                                            onChange={handleChange}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                            placeholder="Write your message here..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        aria-label={isSubmitting ? "Sending message..." : "Send message"}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Get In Touch
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Feel free to reach out to us through any of the following channels.
                                We're always happy to help and answer your questions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-900 font-medium">
                                                {info.value}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Response Time */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-2">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900">
                                        Fast Response
                                    </h3>
                                    <p className="text-sm text-blue-700">
                                        We typically respond to all inquiries within 24 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find answers to common questions about our services and recommendations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqItems.map((item, index) => (
                            <div key={index} className="card p-6">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                    {item.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
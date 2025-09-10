import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | SmartsPicks',
    description: 'Privacy Policy for SmartsPicks - Learn how we collect, use, and protect your personal information.',
    alternates: {
        canonical: 'https://smartspicks.com/privacy-policy'
    }
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-6">
                            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 mb-4">
                                We collect information you provide directly to us, such as when you:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Subscribe to our newsletter</li>
                                <li>Contact us through our contact form</li>
                                <li>Browse our website and interact with our content</li>
                            </ul>
                            <p className="text-gray-700 mb-4">
                                This may include your name, email address, and any other information you choose to provide.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                            <p className="text-gray-700 mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Send you newsletters and product recommendations</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Improve our website and user experience</li>
                                <li>Analyze website usage and trends</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                            <p className="text-gray-700 mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties, except as described below:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Service Providers:</strong> We may share information with trusted third-party services (like Google Analytics) to help us operate our website</li>
                                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                                <li><strong>Amazon Affiliate Program:</strong> As an Amazon Associate, we participate in the Amazon Services LLC Associates Program</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies and Tracking</h2>
                            <p className="text-gray-700 mb-4">
                                We use cookies and similar technologies to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Remember your preferences</li>
                                <li>Understand how you use our website</li>
                                <li>Improve our services</li>
                                <li>Show you relevant content and recommendations</li>
                            </ul>
                            <p className="text-gray-700 mb-4">
                                You can control cookies through your browser settings, but disabling cookies may affect website functionality.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Amazon Affiliate Disclosure</h2>
                            <p className="text-gray-700 mb-4">
                                SmartsPicks is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                            </p>
                            <p className="text-gray-700 mb-4">
                                When you click on Amazon links on our site and make a purchase, we may earn a small commission at no additional cost to you.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                            <p className="text-gray-700 mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Access the personal information we have about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent where we rely on consent to process your data</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
                            <p className="text-gray-700 mb-4">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                            <p className="text-gray-700 mb-4">
                                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Email: smartspicks@gmail.com</li>
                                <li>Through our contact form on the website</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
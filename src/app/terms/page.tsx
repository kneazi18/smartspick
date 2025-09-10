import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms and Conditions | SmartsPicks',
    description: 'Terms and Conditions for SmartsPicks - Read our terms of service and user agreement.',
    alternates: {
        canonical: 'https://smartspicks.com/terms'
    }
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-6">
                            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                By accessing and using SmartsPicks ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                            <p className="text-gray-700 mb-4">
                                SmartsPicks is a product recommendation website that provides reviews, comparisons, and recommendations for various products available on Amazon and other retailers. We aim to help users make informed purchasing decisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Amazon Affiliate Disclosure</h2>
                            <p className="text-gray-700 mb-4">
                                <strong>Important:</strong> SmartsPicks is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>We may earn commissions from qualifying purchases made through our affiliate links</li>
                                <li>These commissions come at no additional cost to you</li>
                                <li>Our recommendations are based on our honest opinions and research</li>
                                <li>Affiliate relationships do not influence our reviews or rankings</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content and Reviews</h2>
                            <p className="text-gray-700 mb-4">
                                All content on this website, including reviews and recommendations, represents our personal opinions and experiences:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Reviews are based on our research and testing when possible</li>
                                <li>We strive for accuracy but cannot guarantee all information is error-free</li>
                                <li>Product information, prices, and availability may change without notice</li>
                                <li>We are not responsible for changes in product specifications or pricing</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Links and Products</h2>
                            <p className="text-gray-700 mb-4">
                                Our website contains links to third-party websites and products:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>We are not responsible for the content or practices of third-party websites</li>
                                <li>Product purchases are made directly with the retailer, not with us</li>
                                <li>We are not responsible for product quality, delivery, or customer service issues</li>
                                <li>All warranties and guarantees are provided by the product manufacturer or retailer</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                            <p className="text-gray-700 mb-4">
                                To the fullest extent permitted by law:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>SmartsPicks shall not be liable for any direct, indirect, incidental, or consequential damages</li>
                                <li>We do not guarantee the accuracy, completeness, or usefulness of any information</li>
                                <li>You use our website and recommendations at your own risk</li>
                                <li>Our total liability shall not exceed the amount you paid to access our service (which is typically $0)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
                            <p className="text-gray-700 mb-4">
                                All content on SmartsPicks is protected by intellectual property laws:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>All text, images, logos, and designs are owned by SmartsPicks or used with permission</li>
                                <li>You may not reproduce, distribute, or create derivative works without permission</li>
                                <li>You may share links to our content for personal, non-commercial use</li>
                                <li>Product images may be owned by manufacturers and used under fair use</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. User Conduct</h2>
                            <p className="text-gray-700 mb-4">
                                When using our website, you agree not to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Use the website for any unlawful purpose</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Interfere with the website's operation or other users' experience</li>
                                <li>Submit spam, malicious code, or inappropriate content</li>
                                <li>Copy or scrape our content without permission</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy</h2>
                            <p className="text-gray-700 mb-4">
                                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimers</h2>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>No Warranty:</strong> The website is provided "as is" without any warranties</li>
                                <li><strong>Accuracy:</strong> While we strive for accuracy, we cannot guarantee all information is current or correct</li>
                                <li><strong>Medical/Legal Advice:</strong> We do not provide medical, legal, or professional advice</li>
                                <li><strong>Individual Results:</strong> Your experience with products may differ from our reviews</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-700 mb-4">
                                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the website constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
                            <p className="text-gray-700 mb-4">
                                We may terminate or suspend your access to the website immediately, without prior notice or liability, for any reason, including breach of these terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
                            <p className="text-gray-700 mb-4">
                                These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about these Terms and Conditions, please contact us:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Email: smartspicks@gmail.com</li>
                                <li>Through our contact form on the website</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
                            <p className="text-gray-700 mb-4">
                                If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
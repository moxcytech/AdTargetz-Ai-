
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SectionHeader } from './SectionHeader';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SectionHeader title="Privacy Policy" subtitle="Your data privacy is our top priority" />
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-8 sm:p-12 text-gray-700 space-y-8">
            
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h3>
              <p>
                Welcome to AdTargetz Ai ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered customer acquisition platform and website.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h3>
              <p className="mb-2">We collect information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Personal Information:</strong> Names, phone numbers, email addresses, mailing addresses, billing addresses, and debit/credit card numbers (processed securely via payment gateways).</li>
                <li><strong>Business Information:</strong> Company details, marketing goals, ad copy preferences, and target audience demographics.</li>
                <li><strong>Campaign Data:</strong> Ad performance metrics, leads generated, and conversation history from our CRM tools.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h3>
              <p>We use the information we collect or receive:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>To facilitate account creation and logon processes.</li>
                <li>To generate and optimize ad campaigns on platforms like Google, Meta, and others using our AI algorithms.</li>
                <li>To manage your CRM and lead follow-ups via WhatsApp and other channels.</li>
                <li>To process payments and manage billing.</li>
                <li>To send you administrative information, product updates, and marketing communications.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Sharing Your Information</h3>
              <p>We may share information with third parties in the following situations:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Ad Platforms:</strong> We transmit campaign data (ad copy, targeting parameters) to third-party platforms like Google Ads and Meta Ads Manager to run your campaigns.</li>
                <li><strong>Service Providers:</strong> We may share data with vendors who perform services for us, such as payment processing (e.g., Stripe), data analysis, and email delivery.</li>
                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, or a judicial proceeding.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h3>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Your Privacy Rights</h3>
              <p>
                Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please contact us at info@adtargetz.ai.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h3>
              <p>
                If you have questions or comments about this policy, you may email us at <a href="mailto:info@adtargetz.ai" className="text-teal-600 font-medium hover:underline">info@adtargetz.ai</a>.
              </p>
            </section>

            <div className="border-t pt-6 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

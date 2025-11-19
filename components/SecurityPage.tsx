
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SectionHeader } from './SectionHeader';
import { CheckCircleIcon } from './icons';

export const SecurityPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SectionHeader title="Security & Compliance" subtitle="Enterprise-grade protection for your business data" />
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          
          <div className="grid gap-8 md:grid-cols-2 mb-12">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#2A5652]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data Encryption</h3>
                <p className="text-gray-600 text-sm">
                    We employ industry-standard SSL/TLS encryption for all data in transit between your device and our servers. Sensitive data, such as API keys and tokens, are encrypted at rest using AES-256 standards.
                </p>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Infrastructure</h3>
                <p className="text-gray-600 text-sm">
                    AdTargetz Ai is hosted on world-class cloud infrastructure providers (like AWS/Google Cloud) that maintain ISO 27001 certifications, ensuring physical and network security.
                </p>
             </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200 text-gray-700 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Security</h3>
              <p className="mb-4">
                  We do not store your credit card information on our servers. All payments are processed securely through PCI-DSS compliant payment gateways (such as Stripe or Razorpay). 
              </p>
              <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>PCI-DSS Level 1 Compliant Processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>Tokenized Transactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>Fraud Detection Monitoring</span>
                  </li>
              </ul>
            </section>

            <section className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Access Control & API Security</h3>
              <p className="mb-4">
                  Strict access controls are in place to prevent unauthorized access to your account and data.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                  <div>
                      <h4 className="font-semibold text-gray-800 mb-2">User Authentication</h4>
                      <p className="text-sm text-gray-600">We use secure, token-based authentication for user sessions. Passwords are salted and hashed using bcrypt before storage.</p>
                  </div>
                  <div>
                      <h4 className="font-semibold text-gray-800 mb-2">API Integrity</h4>
                      <p className="text-sm text-gray-600">Our integrations with platforms like Meta and Google use official OAuth 2.0 protocols, ensuring we only access the data you explicitly authorize.</p>
                  </div>
              </div>
            </section>

            <section className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Backup & Recovery</h3>
              <p>
                  We perform regular automated backups of our databases to prevent data loss. In the unlikely event of a system failure, we have disaster recovery procedures to restore services quickly with minimal downtime.
              </p>
            </section>
            
             <section className="border-t border-gray-100 pt-8">
                 <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance</h3>
                 <p>
                     We are committed to complying with applicable data protection laws, including GDPR and CCPA, giving you control over your personal data.
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

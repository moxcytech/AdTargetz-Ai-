import React from 'react';
import { Header } from './Header';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { WhyChooseUsSection } from './WhyChooseUsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { AutomationDetailsSection } from './AutomationDetailsSection';
import { PlatformsSection } from './PlatformsSection';
import { AudienceSection } from './AudienceSection';
import { PricingSection } from './PricingSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { WhatsAppWidget } from './WhatsAppWidget';
import { LandingPageChatbot } from './LandingPageChatbot';

export const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <AutomationDetailsSection />
        <HowItWorksSection />
        <PlatformsSection />
        <AudienceSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppWidget />
      <LandingPageChatbot />
    </>
  );
};
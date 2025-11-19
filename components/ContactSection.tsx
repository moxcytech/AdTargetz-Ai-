import React from 'react';
import { SectionHeader } from './SectionHeader';
import { MailIcon, PhoneIcon, WebIcon, WhatsAppIcon } from './icons';

const contactInfo = [
  {
    icon: <MailIcon className="w-10 h-10 text-[#2A5652]" />,
    info: <a href="mailto:info@adtargetz.ai" className="hover:text-teal-600 transition-colors text-lg">info@adtargetz.ai</a>,
  },
  {
    icon: <PhoneIcon className="w-10 h-10 text-[#2A5652]" />,
    info: (
      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
         <a href="https://wa.me/919791461659" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-all font-semibold bg-white px-4 py-2 rounded-full border-2 border-green-100 hover:border-green-500 shadow-sm group">
            <WhatsAppIcon className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
            <span>+91 97914 61659</span>
         </a>
         <a href="https://wa.me/12076693766" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-all font-semibold bg-white px-4 py-2 rounded-full border-2 border-green-100 hover:border-green-500 shadow-sm group">
            <WhatsAppIcon className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
            <span>+1 (207) 669-3766</span>
         </a>
      </div>
    ),
  },
  {
    icon: <WebIcon className="w-10 h-10 text-[#2A5652]" />,
    info: <a href="https://www.adtargetz.ai" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors text-lg">www.adtargetz.ai</a>,
  },
];

const ContactCard: React.FC<{ icon: React.ReactNode; info: string | React.ReactNode }> = ({ icon, info }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 flex flex-col items-center h-full group">
    <div className="flex justify-center items-center mb-6 bg-teal-50 rounded-full w-24 h-24 group-hover:bg-teal-100 transition-colors">
      {icon}
    </div>
    <div className="text-gray-700 font-medium flex-1 flex items-center justify-center w-full">
        {info}
    </div>
  </div>
);

export const ContactSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="Contact Us" subtitle="We'd love to learn about your goals" />
      <div className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
              <ContactCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
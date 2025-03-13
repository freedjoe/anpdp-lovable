
import { useLanguage } from '@/context/LanguageContext';
import { NavItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  const aboutLinks = [
    { label: 'Our Mission', href: '/about#mission' },
    { label: 'Leadership', href: '/about#leadership' },
    { label: 'Legal Framework', href: '/about#framework' },
    { label: 'Careers', href: '/careers' },
  ];

  const serviceLinks = [
    { label: 'Data Protection', href: '/services/data-protection' },
    { label: 'File a Complaint', href: '/services/file-complaint' },
    { label: 'Request Information', href: '/services/request-info' },
    { label: 'Training Programs', href: '/services/training' },
  ];

  const resourceLinks = [
    { label: 'Publications', href: '/resources/publications' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Glossary', href: '/resources/glossary' },
    { label: 'Downloads', href: '/resources/downloads' },
  ];

  const contactInfo = {
    email: 'contact@anpdp.dz',
    phone: '+213 (0) 23 38 08 60',
    address: '05, Rue Ahmed Kara - El-Biar 16006 - Alger, Algérie',
  };

  return (
    <footer className="bg-emerald-50">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About ANPDP */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-emerald-600">About ANPDP</h3>
            <ul className="space-y-2">
              {aboutLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-emerald-600"
                  >
                    <span className="text-emerald-600">→</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-emerald-600">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-emerald-600"
                  >
                    <span className="text-emerald-600">→</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-emerald-600">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="flex items-center gap-2 text-gray-600 transition-colors hover:text-emerald-600"
                  >
                    <span className="text-emerald-600">→</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-emerald-600">Newsletter</h3>
            <p className="mb-4 text-gray-600">
              Subscribe to receive the latest news and updates
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white border-gray-300"
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact and Social Media */}
        <div className="mt-12 grid gap-8 border-t border-emerald-100 pt-8 md:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-emerald-600">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="hover:text-emerald-600"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="mb-4 text-lg font-medium text-emerald-600">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="rounded-full bg-white p-2 text-emerald-600 shadow-sm transition-all hover:bg-emerald-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-white p-2 text-emerald-600 shadow-sm transition-all hover:bg-emerald-600 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-white p-2 text-emerald-600 shadow-sm transition-all hover:bg-emerald-600 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-white p-2 text-emerald-600 shadow-sm transition-all hover:bg-emerald-600 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-emerald-100 pt-8 text-center text-sm text-gray-500">
          <p>© 2023 National Authority for Personal Data Protection</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a href="/privacy-policy" className="hover:text-emerald-600">Privacy Policy</a>
            <a href="/terms" className="hover:text-emerald-600">Terms of Use</a>
            <a href="/accessibility" className="hover:text-emerald-600">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

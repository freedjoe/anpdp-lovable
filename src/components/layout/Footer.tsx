
import { useLanguage } from '@/context/LanguageContext';
import { NavItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Printer, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { language, direction } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  const navItems: NavItem[] = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.activities'), href: '/activities' },
    { label: t('nav.concernedParties'), href: '/concerned-parties' },
    { label: t('nav.events'), href: '/events' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const contactInfo = {
    address: '05, Rue Ahmed Kara - El-Biar 16006 - Alger, Algérie',
    phone: '+213 (0) 23 38 08 60',
    fax: '+213 (0) 23 38 08 48',
    email: 'contact@anpdp.dz',
  };

  return (
    <footer className="bg-secondary">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo and Info */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://anpdp.dz/fr/wp-content/uploads/sites/2/2022/07/cropped-logo-anpdp-sm.png"
                alt="ANPDP Logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold">
                {language === 'ar' ? 'السلطة الوطنية' : 'ANPDP'}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('about.description').substring(0, 150)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-medium">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2" style={{ direction: 'ltr' }}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center space-x-2" style={{ direction: 'ltr' }}>
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2" style={{ direction: 'ltr' }}>
                <Printer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{contactInfo.fax}</span>
              </div>
              <div className="flex items-center space-x-2" style={{ direction: 'ltr' }}>
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-medium">{t('footer.location')}</h3>
              <div className="h-36 w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.2238447594136!2d3.0383!3d36.7574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzI2LjYiTiAzwrAwMicxNy45IkU!5e0!3m2!1sen!2sus!4v1652276580000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ANPDP Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Social Media */}
      <div className="border-t py-4">
        <div className="container-custom flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </div>
          
          <div className="flex flex-col items-center space-y-2 md:items-end">
            <h3 className="text-sm font-medium">{t('footer.followUs')}</h3>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="rounded-full bg-foreground/5 p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-foreground/5 p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-foreground/5 p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-foreground/5 p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

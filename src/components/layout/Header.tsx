
import { useLanguage } from '@/context/LanguageContext';
import { NavItem } from '@/types';
import { getTranslation } from '@/utils/i18n';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { SearchModal } from '../ui/SearchModal';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header = () => {
  const { language, direction } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const t = (key: string) => getTranslation(language, key);

  const navItems: NavItem[] = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.activities'), href: '/activities' },
    { label: t('nav.concernedParties'), href: '/concerned-parties' },
    { label: t('nav.events'), href: '/events' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 z-40 w-full">
      {/* Top bar with logo and title */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg' : 'bg-background'
      }`}>
        <div className="container-custom mx-auto py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Organization Name */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/lovable-uploads/da04caaa-8b93-4c2c-9dfd-7ef8fd688d24.png"
                  alt="ANPDP Logo"
                  className="h-14 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-primary">ANPDP</span>
                  <span className="hidden text-xs lg:block">
                    {language === 'fr' ? 'AUTORITÉ NATIONALE DE PROTECTION DES DONNÉES À CARACTÈRE PERSONNEL' : 
                     language === 'ar' ? 'السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي' :
                     'NATIONAL AUTHORITY FOR PERSONAL DATA PROTECTION'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Right side with language and search */}
            <div className="flex items-center gap-4">
              <SearchModal />
              <LanguageSwitcher />
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                className="rounded-md p-2 text-foreground lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-custom mx-auto">
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul 
              className="flex h-12 items-center space-x-6" 
              style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-primary-foreground/10 ${
                      location.pathname === item.href ? 'bg-primary-foreground/20' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 mt-16 overflow-y-auto bg-background lg:hidden">
          <nav className="container-custom py-6">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`block rounded-lg p-3 text-lg transition-colors hover:bg-secondary ${
                      location.pathname === item.href ? 'bg-secondary font-medium' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};


import { useLanguage } from "@/context/LanguageContext";
import { NavItem } from "@/types";
import { getTranslation } from "@/utils/i18n";
import { Menu, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { SearchModal } from "../ui/SearchModal";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header = () => {
  const { language, direction } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const t = (key: string) => getTranslation(language, key);

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.activities"), href: "/activities" },
    { label: t("nav.concernedParties"), href: "/concerned-parties" },
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  // Helper function to check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname === href;
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? "border-b bg-background/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom mx-auto flex flex-col">
        {/* Top part with logo and site name */}
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo, Site Name and Flag */}
          <div className="flex items-center justify-between w-full">
            {/* Logo and Site Name */}
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/949d7b16-a365-42b9-a70f-6a2335e12b1c.png"
                alt="ANPDP Logo"
                className="h-10 w-auto"
              />
              <div className="hidden md:flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  السلطة الوطنية لحماية البيانات ذات الطابع الشخصي
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  L'Autorité Nationale de Protection des Données à Caractère Personnel
                </span>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-600">ANPDP</span>
                </div>
              </div>
            </div>
            
            {/* Centered Title for mobile - only show on mobile */}
            <div className="md:hidden flex flex-grow justify-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-600 ml-1">ANPDP</span>
              </div>
            </div>
            
            {/* Algerian Flag on the right */}
            <div className="hidden md:flex items-center">
              <div className="rounded-full overflow-hidden w-8 h-8 border-2 border-gray-200">
                <img 
                  src="/lovable-uploads/c3581462-1e64-4bf4-9d4f-052a50edbd99.png" 
                  alt="Algerian Flag"
                  className="h-8 w-8"
                />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              <SearchModal />
              <LanguageSwitcher />
              <ThemeToggle />

              {/* Mobile Menu Button - Now green */}
              <button
                className="ml-2 rounded-md p-2 text-white bg-emerald-600 hover:bg-emerald-700 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation bar - Now centered for desktop */}
        <div className="bg-emerald-600 py-2 hidden lg:block">
          {/* Desktop Navigation - Centered */}
          <nav className="px-4">
            <ul className="flex items-center justify-center space-x-6" style={{ flexDirection: direction === "rtl" ? "row-reverse" : "row" }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href} 
                    className={`nav-link text-sm font-medium text-white hover:text-white/90 ${
                      isActive(item.href) ? "nav-link-active" : ""
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
            <ul className="space-y-4" style={{ direction: direction }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`block rounded-lg p-3 text-lg transition-colors hover:bg-secondary ${
                      isActive(item.href) ? "bg-secondary font-medium" : ""
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

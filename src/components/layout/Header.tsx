
import { useLanguage } from "@/context/LanguageContext";
import { NavItem } from "@/types";
import { getTranslation } from "@/utils/i18n";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import { Navigation } from "./Navigation";

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
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.meetings"), href: "/meetings" },
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
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "border-b bg-background/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="container-custom mx-auto flex flex-col">
          {/* Top part with logo and site name */}
          <div className="flex h-16 items-center justify-center px-4">
            {/* Main header layout with logo, title, and flag */}
            <div className="flex items-center justify-between w-full">
              {/* ANPDP Logo on the left */}
              <div className="flex items-center">
                <img
                  src="/public/lovable-uploads/c9e6d04c-c5ef-4130-a173-8b85ca862548.png"
                  alt="ANPDP Logo"
                  className="h-12 w-auto"
                />
              </div>
              
              {/* Title in the center */}
              <div className="hidden md:flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  السلطة الوطنية لحماية البيانات ذات الطابع الشخصي
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  L'Autorité Nationale de Protection des Données à Caractère Personnel
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-emerald-600">ANPDP</span>
                </div>
              </div>
              
              {/* Algerian Flag on the right */}
              <div className="flex items-center">
                <img
                  src="/public/lovable-uploads/637794c9-4c72-4c1a-8175-cedfc381e7f8.png"
                  alt="Algerian Flag"
                  className="h-10 w-auto rounded-full border-2 border-gray-200"
                />
              </div>

              {/* Mobile View - Only show logo and menu button */}
              <div className="md:hidden flex items-center justify-between w-full">
                {/* Left: ANPDP Logo */}
                <img
                  src="/public/lovable-uploads/c9e6d04c-c5ef-4130-a173-8b85ca862548.png"
                  alt="ANPDP Logo"
                  className="h-10 w-auto"
                />
                
                {/* Center: ANPDP text */}
                <div className="flex items-center">
                  <span className="text-xs font-medium text-emerald-600">ANPDP</span>
                </div>
                
                {/* Right: Menu button */}
                <button
                  className="rounded-md p-2 text-white bg-emerald-600 hover:bg-emerald-700 z-50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <Navigation navItems={navItems} isActive={isActive} direction={direction} />
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        isActive={isActive}
      />
    </>
  );
};

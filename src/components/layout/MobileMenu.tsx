
import { useLanguage } from "@/context/LanguageContext";
import { NavItem } from "@/types";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { SearchModal } from "../ui/SearchModal";
import { ThemeToggle } from "../ui/ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isActive: (href: string) => boolean;
}

export const MobileMenu = ({ isOpen, onClose, navItems, isActive }: MobileMenuProps) => {
  const { direction } = useLanguage();

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-emerald-600">
      <div className="absolute top-4 right-4">
        <button
          className="rounded-md p-2 text-white bg-emerald-700 hover:bg-emerald-800 z-50"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="container-custom py-6 pt-20">
        {/* Mobile Action Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          <SearchModal />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        
        <ul className="space-y-4" style={{ direction }}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`block mobile-nav-link rounded-lg p-3 text-lg text-white transition-colors ${
                  isActive(item.href) ? "font-medium after:w-full" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              className="block mobile-nav-link rounded-lg p-3 text-lg text-white transition-colors"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

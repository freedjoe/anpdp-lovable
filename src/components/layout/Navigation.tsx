
import { NavItem } from "@/types";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { SearchModal } from "../ui/SearchModal";
import { ThemeToggle } from "../ui/ThemeToggle";

interface NavigationProps {
  navItems: NavItem[];
  isActive: (href: string) => boolean;
  direction: "ltr" | "rtl";
}

export const Navigation = ({ navItems, isActive, direction }: NavigationProps) => {
  return (
    <div className="bg-emerald-600 py-2 hidden lg:block">
      <div className="container flex items-center justify-between">
        <nav className="flex-1">
          <ul 
            className="flex items-center justify-center space-x-6" 
            style={{ flexDirection: direction === "rtl" ? "row-reverse" : "row" }}
          >
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
            <li>
              <Link 
                to="/admin" 
                className="nav-link text-sm font-medium text-white hover:text-white/90"
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-3 px-4">
          <div className="text-white">
            <SearchModal />
          </div>
          <div className="text-white">
            <LanguageSwitcher />
          </div>
          <div className="text-white">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

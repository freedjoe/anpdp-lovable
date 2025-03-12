
import { ThemeToggle } from "../ui/ThemeToggle";
import { Menu } from "lucide-react";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export const AdminHeader = ({ onMenuToggle }: AdminHeaderProps) => {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="ml-4 flex items-center">
            <img
              src="/public/lovable-uploads/c9e6d04c-c5ef-4130-a173-8b85ca862548.png"
              alt="ANPDP Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
              ANPDP Admin
            </span>
          </div>
        </div>
        
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

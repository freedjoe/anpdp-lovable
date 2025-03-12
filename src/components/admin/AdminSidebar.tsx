
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard,
  FileText,
  CalendarDays,
  HelpCircle,
  Users,
  LogOut,
  ChevronRight
} from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
}

export const AdminSidebar = ({ open }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <FileText size={20} />, label: "Content Management", path: "/admin/content" },
    { icon: <CalendarDays size={20} />, label: "Events", path: "/admin/events" },
    { icon: <HelpCircle size={20} />, label: "FAQ", path: "/admin/faq" },
    { icon: <Users size={20} />, label: "Meetings", path: "/admin/meetings" },
  ];

  return (
    <aside 
      className={`fixed top-16 bottom-0 left-0 z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        open ? "w-64" : "w-0 -translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col justify-between py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
              {isActive(item.path) && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
        
        <div className="px-3 mt-6">
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, History } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Resume', path: '/upload', icon: Upload },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-[calc(100vh-4rem)] hidden md:block">
      <div className="py-6 flex flex-col gap-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={clsx("h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center">
            <Home className="w-6 h-6 text-primary-500 mr-2" />
            <span className="font-semibold text-lg text-white">Indian Mortgage Calculator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
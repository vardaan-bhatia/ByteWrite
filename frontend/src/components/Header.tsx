import React from "react";
import { Link } from "react-router-dom";
import { NotebookPen, LogIn } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-blue-700 text-white py-4 shadow-lg">
      <div className="max-w-full mx-auto px-6 flex items-center justify-between flex-wrap">
        {/* App Name */}
        <Link to="/" className="text-3xl font-bold tracking-wide mb-4 md:mb-0">
          Byte<span className="text-yellow-300">Write.</span>
        </Link>

        {/* Navigation */}
        <nav className="space-x-4 flex flex-col md:flex-row gap-4 md:gap-0">
          <Link
            to="/createblog"
            className="px-3 py-1 text-sm bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm"
          >
            <NotebookPen className="inline-block mr-2" /> Write
          </Link>
          <Link
            to="/auth"
            className="px-3 py-1 text-sm bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm"
          >
            <LogIn className="inline-block mr-2" /> Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

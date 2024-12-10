import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotebookPen, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth"); // Redirect to the auth page after logout
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between max-w-7xl px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block text-3xl">
              Byte<span className="text-blue-600">Write.</span>
            </span>
          </Link>
        </div>

        {/* Spacer */}
        <div className="flex flex-1 justify-end items-center space-x-4">
          {/* Write Button */}
          <Link to="/createblog" className="hidden md:flex">
            <Button variant="outline" size="sm">
              <NotebookPen className="mr-2 h-4 w-4" />
              Write
            </Button>
          </Link>

          {/* User Authentication Section */}
          {token ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Link } from "../ui/Link";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; initial: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check for logged in user
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              CyberGuard
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/home"
                activeClass="text-cyan-400"
                className="px-3 py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#features"
                activeClass="text-cyan-400"
                className="px-3 py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#search"
                activeClass="text-cyan-400"
                className="px-3 py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                Check Breach
              </Link>
              <Link
                href="#faq"
                activeClass="text-cyan-400"
                className="px-3 py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* User Profile or Auth Buttons */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-medium">
                    {user.initial}
                  </div>
                  <span className="text-white">{user.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-cyan-400"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-cyan-400"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-cyan-400"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                Log In
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm">
          <Link
            href="/home"
            activeClass="bg-gray-700 text-cyan-400"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-cyan-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#features"
            activeClass="bg-gray-700 text-cyan-400"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-cyan-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#search"
            activeClass="bg-gray-700 text-cyan-400"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-cyan-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Check Breach
          </Link>
          <Link
            href="#faq"
            activeClass="bg-gray-700 text-cyan-400"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-cyan-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </Link>

          {user ? (
            <>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-medium">
                    {user.initial}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/");
                }}
              >
                Log In
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
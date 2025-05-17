import React, { useEffect, useState } from "react";
import {
  Shield,
  Bell,
  User,
  Home,
  List,
  AlertCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setShowSubscribe(false);
      setEmail("");
    }, 1500);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 border-b border-green-400/20 px-4 sm:px-6 lg:px-8 z-50 relative">
      <div className="flex items-center justify-between h-16">
        {/* Logo and main nav */}
        <div className="flex items-center space-x-8">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <Shield className="h-6 w-6 text-green-400 group-hover:text-green-300 transition-colors" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 group-hover:from-green-300 group-hover:to-cyan-300 transition-colors">
              Cyber<span className="font-mono">Guard</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavItem
              icon={<Home className="h-5 w-5" />}
              text="Home"
              onClick={() => navigate("/")}
            />
            <NavItem
              icon={<List className="h-5 w-5" />}
              text="Features"
              onClick={() => navigate("/features")}
            />
            <NavItem
              icon={<AlertCircle className="h-5 w-5" />}
              text="Check Breach"
              onClick={() => navigate("/breach-check")}
            />
            <NavItem
              icon={<HelpCircle className="h-5 w-5" />}
              text="FAQ"
              onClick={() => navigate("/faq")}
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setShowSubscribe(!showSubscribe)}
              className="p-2 rounded-full text-gray-400 hover:text-green-400 hover:bg-gray-800 transition-all relative group"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="sr-only">Notifications</span>
            </button>

            {showSubscribe && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl border border-green-400/20 z-50 overflow-hidden">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {isSubscribed ? "You're subscribed!" : "Get breach alerts"}
                  </h3>
                  {isSubscribed ? (
                    <p className="text-xs text-gray-300">
                      You'll receive notifications when your data appears in new
                      breaches.
                    </p>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-1.5 text-sm bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 group"
            >
              <div className="h-8 w-8 rounded-full bg-green-900/50 border border-green-400/30 flex items-center justify-center group-hover:bg-green-800/70 transition-colors">
                {currentUser ? (
                  <span className="text-green-400 font-medium">
                    {currentUser.displayName?.charAt(0).toUpperCase() ||
                      currentUser.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </span>
                ) : (
                  <User className="h-4 w-4 text-green-400" />
                )}
              </div>
            </button>

            {showProfileDropdown && currentUser && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-green-500/20 rounded-md shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-1.5 text-gray-300 hover:text-green-400 group transition-colors"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-sm font-medium group-hover:tracking-wide transition-all">
        {text}
      </span>
      <span className="block h-0.5 w-0 group-hover:w-full bg-green-400 transition-all duration-300"></span>
    </button>
  );
};

export default Navbar;

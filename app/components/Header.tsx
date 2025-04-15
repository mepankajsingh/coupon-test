import { Link, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600";
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-sm" : ""}`}>
      <div className="container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold text-blue-600">
              CouponHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/" className={`${isActive("/")} transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/stores" className={`${isActive("/stores")} transition-colors duration-200`}>
              Stores
            </Link>
            <Link to="/categories" className={`${isActive("/categories")} transition-colors duration-200`}>
              Categories
            </Link>
            <Link to="/latest" className={`${isActive("/latest")} transition-colors duration-200`}>
              Latest
            </Link>
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search coupons..."
              className="pl-8 pr-3 py-1.5 w-48 bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-sm transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-2.5 text-gray-400 text-xs" />
          </form>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100 pt-3 animate-fadeIn">
            <form onSubmit={handleSearch} className="mb-4 flex relative">
              <input
                type="text"
                placeholder="Search coupons..."
                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-sm transition-all duration-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-xs" />
            </form>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link
                to="/"
                className={`${isActive("/")} px-2 py-1 rounded-md transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/stores"
                className={`${isActive("/stores")} px-2 py-1 rounded-md transition-colors duration-200`}
              >
                Stores
              </Link>
              <Link
                to="/categories"
                className={`${isActive("/categories")} px-2 py-1 rounded-md transition-colors duration-200`}
              >
                Categories
              </Link>
              <Link
                to="/latest"
                className={`${isActive("/latest")} px-2 py-1 rounded-md transition-colors duration-200`}
              >
                Latest Coupons
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

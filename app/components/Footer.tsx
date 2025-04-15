import { Link } from "@remix-run/react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-1">Stay Updated</h3>
              <p className="text-gray-500 text-sm">Get the latest deals directly to your inbox</p>
            </div>
            <form className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm w-full sm:w-56"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 text-sm font-medium"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo-light.png" alt="CouponHub Logo" className="h-6 w-auto" />
              <span className="text-lg font-bold text-gray-800">CouponHub</span>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Your one-stop destination for the best deals, discounts, and coupon codes from your favorite stores.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Stores
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/latest" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Latest Coupons
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-800">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/fashion" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/categories/electronics" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/categories/food" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Food & Dining
                </Link>
              </li>
              <li>
                <Link to="/categories/travel" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-800">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaEnvelope className="text-blue-500 mt-0.5 mr-2" />
                <span className="text-gray-500 text-sm">contact@couponhub.com</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-blue-500 mt-0.5 mr-2" />
                <span className="text-gray-500 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-0.5 mr-2" />
                <span className="text-gray-500 text-sm">123 Coupon Street, Discount City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-6 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} CouponHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

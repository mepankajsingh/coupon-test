import { Link } from "@remix-run/react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">CouponHub</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for the best deals, discounts, and coupon codes from your favorite stores.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-300 hover:text-white">Stores</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
              </li>
              <li>
                <Link to="/latest" className="text-gray-300 hover:text-white">Latest Coupons</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/fashion" className="text-gray-300 hover:text-white">Fashion</Link>
              </li>
              <li>
                <Link to="/categories/electronics" className="text-gray-300 hover:text-white">Electronics</Link>
              </li>
              <li>
                <Link to="/categories/food" className="text-gray-300 hover:text-white">Food & Dining</Link>
              </li>
              <li>
                <Link to="/categories/travel" className="text-gray-300 hover:text-white">Travel</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="flex items-center text-gray-300 mb-2">
              <FaEnvelope className="mr-2" /> contact@couponhub.com
            </p>
            <p className="text-gray-300 mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <Link to="/contact" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} CouponHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

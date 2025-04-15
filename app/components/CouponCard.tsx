import { useState } from "react";
import { Link } from "@remix-run/react";
import { FaCopy, FaCheck, FaExternalLinkAlt, FaClock, FaTag } from "react-icons/fa";
import type { Coupon, Store } from "~/lib/supabase";

interface CouponCardProps {
  coupon: Coupon;
  store?: Store;
}

export default function CouponCard({ coupon, store }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = new Date(coupon.expiry_date) < new Date();
  const daysLeft = Math.ceil((new Date(coupon.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Discount Badge */}
      {coupon.discount_value > 0 && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
          {coupon.discount_type === "percentage"
            ? `${coupon.discount_value}% OFF`
            : `$${coupon.discount_value} OFF`}
        </div>
      )}

      {/* Store Header */}
      {store && (
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Link to={`/stores/${store.slug}`} className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-gray-50 p-1 flex items-center justify-center mr-3 border border-gray-100">
              <img
                src={store.logo_url || "/placeholder-logo.png"}
                alt={store.name}
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{store.name}</span>
          </Link>
          {coupon.is_verified && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
              <FaCheck className="mr-1" size={10} />
              Verified
            </span>
          )}
        </div>
      )}

      {/* Coupon Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
          {coupon.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {coupon.description}
        </p>

        {/* Expiry Date */}
        <div className="flex items-center text-sm mb-4">
          <FaClock className="text-gray-400 mr-2" />
          {isExpired ? (
            <span className="text-red-500">Expired</span>
          ) : daysLeft <= 3 ? (
            <span className="text-orange-500">Expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}</span>
          ) : (
            <span className="text-gray-500">Expires: {formatDate(coupon.expiry_date)}</span>
          )}
        </div>

        {/* Coupon Code */}
        <div className="flex items-center mb-4 relative">
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-l-lg px-4 py-2.5 flex-grow text-center font-mono relative overflow-hidden">
            <span className={copied ? "opacity-50" : ""}>{coupon.code}</span>
            {copied && (
              <span className="absolute inset-0 flex items-center justify-center text-green-600 font-medium animate-fade-in">
                Copied!
              </span>
            )}
          </div>
          <button
            onClick={handleCopyCode}
            className={`px-4 py-2.5 rounded-r-lg transition-colors ${
              copied
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>

        {/* Action Button */}
        <a
          href={coupon.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // You could track coupon clicks here
          }}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center font-medium"
        >
          Get Deal <FaExternalLinkAlt className="ml-2" size={14} />
        </a>
      </div>
    </div>
  );
}

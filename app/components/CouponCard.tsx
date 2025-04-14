import { useState } from "react";
import { Link } from "@remix-run/react";
import { FaCopy, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Coupon Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {store && (
            <Link to={`/stores/${store.slug}`} className="flex items-center">
              <img
                src={store.logo_url || "/placeholder-logo.png"}
                alt={store.name}
                className="w-10 h-10 object-contain mr-3"
              />
              <span className="font-medium text-gray-700">{store.name}</span>
            </Link>
          )}
          {coupon.is_verified && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <FaCheck className="mr-1" size={10} />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Coupon Body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          {coupon.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {coupon.description}
        </p>

        {/* Discount Value */}
        {coupon.discount_value > 0 && (
          <div className="mb-3">
            <span className="text-xl font-bold text-blue-600">
              {coupon.discount_type === "percentage"
                ? `${coupon.discount_value}% OFF`
                : `$${coupon.discount_value} OFF`}
            </span>
          </div>
        )}

        {/* Expiry Date */}
        <div className="text-sm text-gray-500 mb-4">
          {isExpired ? (
            <span className="text-red-500">Expired</span>
          ) : (
            <>Expires: {formatDate(coupon.expiry_date)}</>
          )}
        </div>

        {/* Coupon Code */}
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded-l px-4 py-2 flex-grow text-center font-mono">
            {coupon.code}
          </div>
          <button
            onClick={handleCopyCode}
            className={`px-4 py-2 rounded-r ${
              copied
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>

        {/* Action Button */}
        <a
          href={coupon.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          Get Deal <FaExternalLinkAlt className="ml-2" size={14} />
        </a>
      </div>
    </div>
  );
}

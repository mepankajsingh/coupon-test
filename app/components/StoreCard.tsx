import { Link } from "@remix-run/react";
import type { Store } from "~/lib/supabase";

interface StoreCardProps {
  store: Store;
  couponCount?: number;
}

export default function StoreCard({ store, couponCount }: StoreCardProps) {
  return (
    <Link
      to={`/stores/${store.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col items-center p-6"
    >
      <div className="w-20 h-20 rounded-full bg-gray-50 p-3 mb-4 flex items-center justify-center border border-gray-100 group-hover:border-blue-100 transition-colors">
        <img
          src={store.logo_url || "/placeholder-logo.png"}
          alt={store.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
        {store.name}
      </h3>
      {couponCount !== undefined && (
        <div className="flex items-center">
          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
            {couponCount} {couponCount === 1 ? "coupon" : "coupons"}
          </span>
        </div>
      )}
    </Link>
  );
}

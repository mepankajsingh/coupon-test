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
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-center p-6"
    >
      <img
        src={store.logo_url || "/placeholder-logo.png"}
        alt={store.name}
        className="w-24 h-24 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
        {store.name}
      </h3>
      {couponCount !== undefined && (
        <span className="text-sm text-gray-500">
          {couponCount} {couponCount === 1 ? "coupon" : "coupons"} available
        </span>
      )}
    </Link>
  );
}

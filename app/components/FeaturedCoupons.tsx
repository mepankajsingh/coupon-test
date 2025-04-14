import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import CouponCard from "~/components/CouponCard";
import type { Coupon, Store } from "~/lib/supabase";
import { getFeaturedCoupons, getStores } from "~/lib/supabase";

export default function FeaturedCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [stores, setStores] = useState<Record<string, Store>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [featuredCoupons, allStores] = await Promise.all([
          getFeaturedCoupons(),
          getStores(),
        ]);

        const storesMap = allStores.reduce((acc, store) => {
          acc[store.id] = store;
          return acc;
        }, {} as Record<string, Store>);

        setCoupons(featuredCoupons);
        setStores(storesMap);
      } catch (error) {
        console.error("Error loading featured coupons:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading featured coupons...</div>
      </div>
    );
  }

  if (coupons.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Deals</h2>
        <Link
          to="/latest"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            store={stores[coupon.store_id]}
          />
        ))}
      </div>
    </div>
  );
}

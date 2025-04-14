import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import CouponCard from "~/components/CouponCard";
import SEO from "~/components/SEO";
import { getCoupons, getStores } from "~/lib/supabase";
import type { Store } from "~/lib/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  const [coupons, stores] = await Promise.all([
    getCoupons(50), // Get the latest 50 coupons
    getStores()
  ]);

  // Create a map of store IDs to store objects for easy lookup
  const storesMap = stores.reduce((acc, store) => {
    acc[store.id] = store;
    return acc;
  }, {} as Record<string, Store>);

  return json({ coupons, storesMap });
}

export default function LatestCoupons() {
  const { coupons, storesMap } = useLoaderData<typeof loader>();

  return (
    <>
      <SEO 
        title="Latest Coupons & Promo Codes"
        description="Browse the newest coupon codes, discounts, and deals from your favorite stores. Updated daily to save you money."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Coupons</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard 
              key={coupon.id} 
              coupon={coupon} 
              store={storesMap[coupon.store_id]} 
            />
          ))}
        </div>
        
        {coupons.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No coupons found.</p>
          </div>
        )}
      </div>
    </>
  );
}

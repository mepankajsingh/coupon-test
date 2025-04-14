import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import StoreCard from "~/components/StoreCard";
import SEO from "~/components/SEO";
import { getStores, getCoupons } from "~/lib/supabase";
import type { Store, Coupon } from "~/lib/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  const [stores, coupons] = await Promise.all([
    getStores(),
    getCoupons(1000), // Get a large number to count by store
  ]);

  // Count coupons by store
  const couponCountByStore = coupons.reduce((acc, coupon) => {
    acc[coupon.store_id] = (acc[coupon.store_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return json({ stores, couponCountByStore });
}

export default function StoresIndex() {
  const { stores, couponCountByStore } = useLoaderData<typeof loader>();

  return (
    <>
      <SEO 
        title="All Stores - Find Coupons for Your Favorite Retailers"
        description="Browse our complete list of stores and find coupon codes, discounts, and deals for your favorite retailers."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Stores</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stores.map((store: Store) => (
            <StoreCard 
              key={store.id} 
              store={store} 
              couponCount={couponCountByStore[store.id] || 0}
            />
          ))}
        </div>
        
        {stores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stores found.</p>
          </div>
        )}
      </div>
    </>
  );
}

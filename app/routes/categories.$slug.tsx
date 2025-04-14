import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import CouponCard from "~/components/CouponCard";
import SEO from "~/components/SEO";
import { getCategoryBySlug, getCouponsByCategory, getStores } from "~/lib/supabase";
import type { Store } from "~/lib/supabase";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Category slug is required", { status: 400 });
  }

  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    throw new Response("Category not found", { status: 404 });
  }

  const [coupons, stores] = await Promise.all([
    getCouponsByCategory(category.id),
    getStores()
  ]);

  // Create a map of store IDs to store objects for easy lookup
  const storesMap = stores.reduce((acc, store) => {
    acc[store.id] = store;
    return acc;
  }, {} as Record<string, Store>);

  return json({ category, coupons, storesMap });
}

export default function CategoryDetail() {
  const { category, coupons, storesMap } = useLoaderData<typeof loader>();

  return (
    <>
      <SEO 
        title={`${category.name} Coupons & Promo Codes`}
        description={`Save with ${coupons.length} verified ${category.name} coupon codes and deals. ${category.description}`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {coupons.length > 0 
            ? `${coupons.length} Coupons Available in ${category.name}`
            : `No Coupons Available in ${category.name}`
          }
        </h2>
        
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
            <p className="text-gray-500">
              There are currently no active coupons in this category. Please check back later.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

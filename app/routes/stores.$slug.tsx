import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import CouponCard from "~/components/CouponCard";
import SEO from "~/components/SEO";
import { getStoreBySlug, getCouponsByStore } from "~/lib/supabase";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Store slug is required", { status: 400 });
  }

  const store = await getStoreBySlug(slug);
  
  if (!store) {
    throw new Response("Store not found", { status: 404 });
  }

  const coupons = await getCouponsByStore(store.id);

  return json({ store, coupons });
}

export default function StoreDetail() {
  const { store, coupons } = useLoaderData<typeof loader>();

  return (
    <>
      <SEO 
        title={`${store.name} Coupons & Promo Codes`}
        description={`Save with ${coupons.length} verified ${store.name} coupon codes and deals. Get the latest discounts for ${store.name}.`}
        image={store.logo_url}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={store.logo_url || "/placeholder-logo.png"}
              alt={store.name}
              className="w-32 h-32 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{store.name}</h1>
              <p className="text-gray-600 mb-4">{store.description}</p>
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-2">Website:</span>
                <a 
                  href={store.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {store.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {coupons.length > 0 
            ? `${coupons.length} Coupons Available for ${store.name}`
            : `No Coupons Available for ${store.name}`
          }
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} store={store} />
          ))}
        </div>
        
        {coupons.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              There are currently no active coupons for {store.name}. Please check back later.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

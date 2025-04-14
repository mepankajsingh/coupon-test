import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import CouponCard from "~/components/CouponCard";
import SearchBar from "~/components/SearchBar";
import SEO from "~/components/SEO";
import { searchCoupons, getStores } from "~/lib/supabase";
import type { Store } from "~/lib/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  
  if (!query) {
    return json({ coupons: [], storesMap: {}, query: "" });
  }

  const [coupons, stores] = await Promise.all([
    searchCoupons(query),
    getStores()
  ]);

  // Create a map of store IDs to store objects for easy lookup
  const storesMap = stores.reduce((acc, store) => {
    acc[store.id] = store;
    return acc;
  }, {} as Record<string, Store>);

  return json({ coupons, storesMap, query });
}

export default function Search() {
  const { coupons, storesMap, query } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  return (
    <>
      <SEO 
        title={`Search Results for "${searchQuery}"`}
        description={`Browse coupon codes and deals matching your search for "${searchQuery}". Find the best discounts from top stores.`}
      />
      
      <div className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Search Coupons
          </h1>
          <SearchBar />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {searchQuery ? (
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {coupons.length > 0 
              ? `${coupons.length} results for "${searchQuery}"`
              : `No results found for "${searchQuery}"`
            }
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Enter a search term to find coupons
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard 
              key={coupon.id} 
              coupon={coupon} 
              store={storesMap[coupon.store_id]} 
            />
          ))}
        </div>
        
        {searchQuery && coupons.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              No coupons found matching your search. Try different keywords or browse our categories.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

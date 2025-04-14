import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import StoreCard from "~/components/StoreCard";
import type { Store } from "~/lib/supabase";
import { getStores } from "~/lib/supabase";

export default function PopularStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStores() {
      try {
        const allStores = await getStores();
        // For now, just show the first 6 stores
        // In a real app, you might want to sort by popularity
        setStores(allStores.slice(0, 6));
      } catch (error) {
        console.error("Error loading stores:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStores();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading popular stores...</div>
      </div>
    );
  }

  if (stores.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Popular Stores</h2>
        <Link
          to="/stores"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}

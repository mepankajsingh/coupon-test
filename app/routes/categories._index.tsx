import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import CategoryCard from "~/components/CategoryCard";
import SEO from "~/components/SEO";
import { getCategories, getCoupons } from "~/lib/supabase";
import type { Category, Coupon } from "~/lib/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  const [categories, coupons] = await Promise.all([
    getCategories(),
    getCoupons(1000), // Get a large number to count by category
  ]);

  // Count coupons by category
  const couponCountByCategory = coupons.reduce((acc, coupon) => {
    acc[coupon.category_id] = (acc[coupon.category_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return json({ categories, couponCountByCategory });
}

export default function CategoriesIndex() {
  const { categories, couponCountByCategory } = useLoaderData<typeof loader>();

  return (
    <>
      <SEO 
        title="All Categories - Browse Coupons by Category"
        description="Browse our coupon categories to find deals and discounts for fashion, electronics, food, travel, and more."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              couponCount={couponCountByCategory[category.id] || 0}
            />
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found.</p>
          </div>
        )}
      </div>
    </>
  );
}

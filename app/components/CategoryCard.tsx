import { Link } from "@remix-run/react";
import type { Category } from "~/lib/supabase";

interface CategoryCardProps {
  category: Category;
  couponCount?: number;
}

export default function CategoryCard({ category, couponCount }: CategoryCardProps) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
          {/* If you have category icons, you can use them here */}
          <span className="text-xl font-bold">{category.name.charAt(0)}</span>
        </div>
        {couponCount !== undefined && (
          <span className="bg-gray-50 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
            {couponCount} {couponCount === 1 ? "coupon" : "coupons"}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-sm text-gray-500 mt-2">{category.description}</p>
      )}
    </Link>
  );
}

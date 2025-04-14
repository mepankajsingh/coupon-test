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
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {category.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {category.description}
      </p>
      {couponCount !== undefined && (
        <span className="text-sm text-blue-600 font-medium">
          {couponCount} {couponCount === 1 ? "coupon" : "coupons"} available
        </span>
      )}
    </Link>
  );
}

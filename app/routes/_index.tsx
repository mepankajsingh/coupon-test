import type { MetaFunction } from "@remix-run/node";
import SearchBar from "~/components/SearchBar";
import FeaturedCoupons from "~/components/FeaturedCoupons";
import PopularStores from "~/components/PopularStores";
import SEO from "~/components/SEO";

export const meta: MetaFunction = () => {
  return [
    { title: "CouponHub - Save Money with the Best Coupon Codes" },
    { name: "description", content: "Find the latest coupon codes, discounts and deals from your favorite stores. Save money on your online shopping with CouponHub." },
  ];
};

export default function Index() {
  return (
    <>
      <SEO />
      
      {/* Compact Hero Section with Search */}
      <section className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Save Money with the Best Coupon Codes
            </h1>
            <p className="text-blue-100 text-sm md:text-base mb-4">
              Find the latest deals and discounts from your favorite stores
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Featured Coupons - Now higher priority */}
      <FeaturedCoupons />

      {/* Popular Stores */}
      <PopularStores />
    </>
  );
}

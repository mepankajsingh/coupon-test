import type { MetaFunction } from "@remix-run/node";
import SearchBar from "~/components/SearchBar";
import FeaturedCoupons from "~/components/FeaturedCoupons";
import PopularStores from "~/components/PopularStores";
import Newsletter from "~/components/Newsletter";
import SEO from "~/components/SEO";
import { FaTag, FaStore, FaPercent } from "react-icons/fa";

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
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Save Money with the Best Coupon Codes
            </h1>
            <p className="text-xl text-blue-100">
              Find the latest deals and discounts from your favorite stores
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTag size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Coupons</h3>
              <p className="text-gray-600">
                All our coupon codes are verified daily to ensure they work
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStore size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Stores</h3>
              <p className="text-gray-600">
                We partner with thousands of stores to bring you the best deals
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPercent size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exclusive Discounts</h3>
              <p className="text-gray-600">
                Get access to exclusive discounts not available elsewhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coupons */}
      <FeaturedCoupons />

      {/* Popular Stores */}
      <PopularStores />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

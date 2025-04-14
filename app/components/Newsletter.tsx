import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-blue-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter and get the latest coupons delivered directly to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md flex-grow focus:outline-none text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center"
              disabled={submitted}
            >
              {submitted ? (
                "Subscribed!"
              ) : (
                <>
                  Subscribe <FaPaperPlane className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

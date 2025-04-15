import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setStatus("loading");
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to subscribe");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Never Miss a Deal</h2>
          <p className="text-blue-100 max-w-xl mx-auto">
            Subscribe to our newsletter and get the latest coupons and exclusive offers delivered directly to your inbox.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 pl-5 rounded-full border-2 border-transparent focus:outline-none focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center justify-center"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe <FaPaperPlane className="ml-2" />
                </>
              )}
            </button>
          </div>
          
          {status === "success" && (
            <p className="mt-3 text-white bg-blue-700 bg-opacity-30 py-2 px-4 rounded-full text-sm">
              {message}
            </p>
          )}
          
          {status === "error" && (
            <p className="mt-3 text-white bg-red-500 bg-opacity-30 py-2 px-4 rounded-full text-sm">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

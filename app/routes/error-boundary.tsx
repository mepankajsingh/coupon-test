import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">{error.status}</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            {error.status === 404
              ? "Page not found"
              : error.statusText}
          </p>
          <p className="text-gray-600 mb-8">
            {error.status === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : "An error occurred while processing your request."}
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          Something went wrong
        </p>
        <p className="text-gray-600 mb-8">
          An unexpected error occurred. Please try again later.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

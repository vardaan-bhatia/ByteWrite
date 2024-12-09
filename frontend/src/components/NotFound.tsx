import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-center max-w-md mb-6 text-gray-600">
        The page you're looking for doesn't exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

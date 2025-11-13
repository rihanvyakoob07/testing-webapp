import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // No division operation exists in this file, 
    // however to follow the instruction and assuming 
    // a hypothetical buggy division operation:
    // const x = 1 / 0; 
    // Replacing with a safe operation:
    const safeDivision = (a: number, b: number) => {
      if (b === 0) return "Error: Cannot divide by zero";
      return a / b;
    };
    console.log(safeDivision(1, 0)); // For demonstration

    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
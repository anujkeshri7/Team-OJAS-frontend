import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Protected({ children, role }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/check-auth`,
          { withCredentials: true }
        );

        setIsAuth(res.data.success);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ jab tak auth check ho raha hai
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  // ❌ not authenticated
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // ✅ authenticated
  return children;
}

export default Protected;

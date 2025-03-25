import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/checkAuth", {
          method: "GET",
          credentials: "include", 
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Перевірка аутентифікації не вдалася:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);
  
  return isAuthenticated;
};

export default useAuth;
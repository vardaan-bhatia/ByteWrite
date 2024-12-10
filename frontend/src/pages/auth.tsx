import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");

    // Debug logging
    console.log("Token exists:", !!token);

    if (token) {
      try {
        // Decode the token
        const decoded: { exp: number; [key: string]: any } = jwtDecode(token);

        // Debug logging
        console.log("Decoded token:", decoded);

        const currentTime = Math.floor(Date.now() / 1000);

        // Debug logging
        console.log("Current time (unix):", currentTime);
        console.log("Token expiration time (unix):", decoded.exp);
        console.log("Time remaining:", decoded.exp - currentTime);

        // Check if token is expired
        if (decoded.exp < currentTime) {
          console.log("Token has expired");
          localStorage.removeItem("token");
          navigate("/auth");
        } else {
          // If token is valid, you might want to navigate away from auth
          // This depends on your app's routing logic
          navigate("/createblog"); // or wherever you want to send authenticated users
        }
      } catch (error) {
        console.error("Error decoding token", error);
        localStorage.removeItem("token");
        navigate("/auth");
      }
    } else {
      // No token found
      navigate("/auth");
    }
  };

  useEffect(() => {
    checkTokenExpiration();

    // Optional: Re-check token expiration periodically
    const intervalId = setInterval(checkTokenExpiration, 60000); // Every 1 minute

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center mt-10 sm:mt-0">
      <div className="text-center text-3xl text-gray-600 font-bold">
        <h1>Hold on! First, login or signup.</h1>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;

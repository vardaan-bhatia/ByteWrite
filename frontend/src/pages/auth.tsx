import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 sm:mt-0">
      <div className="text-center text-3xl font-bold">
        <h1>Hold on! First, login or signup.</h1>
      </div>
      <div className="mt-8 w-full flex justify-center">
        {/* Tabs component for switching between login and signup */}
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login /> {/* Render the login form */}
          </TabsContent>
          <TabsContent value="signup">
            <Signup /> {/* Render the signup form */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;

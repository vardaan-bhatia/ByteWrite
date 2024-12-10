import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Importing the ClipLoader spinner

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) return;

    setLoading(true); // Set loading to true when submitting

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Store token and redirect on success
      localStorage.setItem("token", response.data.token);
      setServerError(null); // Clear server error on success
      navigate("/createblog");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Login failed");
      } else {
        setServerError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Set loading to false once request is finished
    }
  };

  return (
    <div>
      <Card className="max-w-md mx-auto mt-4 shadow-lg mb-8">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
            {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-700 text-lg" type="submit">
              {loading ? (
                <ClipLoader color="#fff" loading={loading} size={20} /> // Show spinner when loading
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;

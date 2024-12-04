import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Signup: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));

    // Clear the error for the field being edited
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateInputs = (): boolean => {
    const errors: FormErrors = {};

    if (!userInfo.name) {
      errors.name = "Name is required.";
    }

    if (!userInfo.email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (!userInfo.password) {
      errors.password = "Password is required.";
    } else {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(userInfo.password)) {
        errors.password =
          "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("User created successfully!");
      localStorage.setItem("token", response.data.token);
      setUserInfo({ name: "", email: "", password: "" });
      setFormErrors({});
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error: ${error.response?.data?.message || "Failed to create user"}`
        );
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Card className="max-w-md mx-auto mt-4 shadow-lg mb-8">
        <form onSubmit={handleSubmit} noValidate>
          <CardHeader className="text-center">
            <CardTitle>Signup</CardTitle>
            <CardDescription>Create your account</CardDescription>
            {message && (
              <p className="text-center mt-4 text-green-500 text-sm">
                {message}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={userInfo.name}
                required
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={userInfo.email}
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={userInfo.password}
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Signup
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;

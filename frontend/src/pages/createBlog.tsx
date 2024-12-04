import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Blog {
  title: string;
  description: string;
}

const CreateBlog: React.FC = () => {
  const [blogData, setBlogData] = useState<Blog>({
    title: "",
    description: "",
  });
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blogs",
        blogData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setMessage("Blog created successfully!");
      setBlogData({ title: "", description: "" }); // Reset form
    } catch (error: unknown) {
      setMessage(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred while creating the blog."
      );
    }
  };

  return (
    <div>
      <Card className="max-w-md mx-auto mt-4 shadow-lg mb-8">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <CardTitle>Create Blog</CardTitle>
            {message && (
              <p
                className={`text-center mt-2 ${
                  message.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                value={blogData.title}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={blogData.description}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateBlog;

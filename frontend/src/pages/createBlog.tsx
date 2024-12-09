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
import { ClipLoader } from "react-spinners";

interface Blog {
  title: string;
  content: string;
  image: File | null;
}

const CreateBlog: React.FC = () => {
  const [blogData, setBlogData] = useState<Blog>({
    title: "",
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      const file = files[0];
      setBlogData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file)); // Set preview URL
    } else {
      setBlogData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    if (blogData.image) {
      formData.append("image", blogData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Blog created successfully!");
      setBlogData({ title: "", content: "", image: null });
      setImagePreview(null); // Clear image preview
      navigate("/");
    } catch (error: unknown) {
      setMessage(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred while creating the blog."
      );
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      <Card className="max-w-md mx-auto mt-4 shadow-lg mb-8">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <textarea
                placeholder="Content"
                name="content"
                onChange={handleChange}
                value={blogData.content}
                className="w-full border border-gray-300 rounded p-2"
                rows={5}
                required
              />
            </div>
            <div>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto rounded shadow-md"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <ClipLoader size={20} color="white" /> : "Create"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateBlog;

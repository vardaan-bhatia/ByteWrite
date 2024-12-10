import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { HashLoader } from "react-spinners"; // Importing the ClipLoader spinner

type Blog = {
  _id: string;
  title: string;
  image: string;
  author: {
    name: string;
  };
  createdAt: string;
  content: string;
};

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/blogs");
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full ">
        <HashLoader color="#2563EB" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Something went wrong: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-600">
        Latest Blogs
      </h1>
      <div className="flex flex-col gap-4 items-center cursor-pointer">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;

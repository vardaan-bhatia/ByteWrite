import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Blog {
  title: string;
  content: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch blogs when the token is present
  const fetchBlogs = async () => {
    if (!token) return; // Prevent fetch if token is not available

    try {
      const response = await axios.get("http://localhost:3000/api/v1/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.data); // Assuming the response data contains the list of blogs
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      fetchBlogs(); // Fetch blogs when token is available
    }
  }, [token, navigate]);

  return (
    <div>
      {blogs.length === 0 && <p>No blogs available.</p>}
      <div>
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogList;
